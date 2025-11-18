#!/usr/bin/env node
/**
 * DERP Local Test Script
 *
 * Tests the local DERP server by:
 * 1. Connecting to the WebSocket endpoint
 * 2. Making test RPC calls through the DERP proxy
 * 3. Validating that log messages are received via WebSocket
 *
 * Usage:
 *   1. Start the local dev server: yarn start-miniflare or npx wrangler dev
 *   2. Run this script: yarn test:local
 */

import WebSocket from 'ws';
import fetch from 'node-fetch';

// Configuration
const CONFIG = {
  host: 'localhost',
  port: 8787,
  wsPath: '/client_logs/websocket',
  rpcEndpoint: '/rpc/xdai/mainnet',
  timeout: 10000, // 10 seconds
};

// Test state
const state = {
  wsConnected: false,
  messagesReceived: [],
  testsPassed: 0,
  testsFailed: 0,
};

function log(message) {
  console.log(`${message}`);
}

function logTest(name, passed, details = '') {
  const status = passed ? 'PASS' : 'FAIL';
    log(`  ${status}: ${name}`);
  if (details) {
    log(`    ${details}`);
  }
  if (passed) {
    state.testsPassed++;
  } else {
    state.testsFailed++;
  }
}

/**
 * Validate message structure
 */
function validateMessage(message) {
  const errors = [];
  const warnings = [];

  if (!message.ip) errors.push('Missing "ip" field');
  // country is null in localhost - this is expected
  if (message.country === undefined) warnings.push('Missing "country" field (null is OK for localhost)');
  if (!message.cf) errors.push('Missing "cf" field');
  if (!message.log) errors.push('Missing "log" field');

  if (message.log) {
    if (!message.log.timestamp) errors.push('Missing "log.timestamp" field');
    if (!message.log.userAgent) errors.push('Missing "log.userAgent" field');
    if (!message.log.type) errors.push('Missing "log.type" field');
    if (!message.log.method) errors.push('Missing "log.method" field');
  }

  return { errors, warnings };
}

/**
 * Make an RPC call through the DERP proxy
 */
async function makeRPCCall(method, params = []) {
  const url = `http://${CONFIG.host}:${CONFIG.port}${CONFIG.rpcEndpoint}`;

  const body = JSON.stringify({
    jsonrpc: '2.0',
    id: Date.now(),
    method,
    params,
  });

  log(`    Making RPC call: ${method}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Wait for a condition with timeout
 */
function waitFor(condition, timeout = CONFIG.timeout) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (condition()) {
        clearInterval(interval);
        resolve();
      } else if (Date.now() - startTime > timeout) {
        clearInterval(interval);
        reject(new Error('Timeout waiting for condition'));
      }
    }, 100);
  });
}

/**
 * Run test suite
 */
async function runTests() {
  log('\n==================================================');
  log('  DERP Local Test Suite');
  log('==================================================\n');

  log(`Target: ws://${CONFIG.host}:${CONFIG.port}${CONFIG.wsPath}`);
  log(`RPC Endpoint: http://${CONFIG.host}:${CONFIG.port}${CONFIG.rpcEndpoint}\n`);

  return new Promise((resolve, reject) => {
    // Test 1: WebSocket Connection
    log('Test 1: WebSocket Connection');

    const wsUrl = `ws://${CONFIG.host}:${CONFIG.port}${CONFIG.wsPath}`;
    const ws = new WebSocket(wsUrl);

    const connectionTimeout = setTimeout(() => {
      logTest('WebSocket connection', false, 'Connection timeout');
      ws.close();
      reject(new Error('WebSocket connection timeout'));
    }, CONFIG.timeout);

    ws.on('open', async () => {
      clearTimeout(connectionTimeout);
      state.wsConnected = true;
      logTest('WebSocket connection', true, 'Successfully connected to WebSocket endpoint');

      // Test 2: Message Reception
      log('\nTest 2: RPC Call and Message Reception');

      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          state.messagesReceived.push(message);

          log(`    Received message for method: ${message.log?.method}`);

          // Validate message structure
          const { errors, warnings } = validateMessage(message);
          if (errors.length === 0) {
            const warningMsg = warnings.length > 0 ? ` (Warnings: ${warnings.join(', ')})` : '';
            logTest(`Message structure validation`, true, `All required fields present${warningMsg}`);
          } else {
            logTest(`Message structure validation`, false, `Errors: ${errors.join(', ')}`);
          }

          // Log message details
          log(`    Message details:`);
          log(`      - IP: ${message.ip}`);
          log(`      - Country: ${message.country}`);
          log(`      - Method: ${message.log?.method}`);
          log(`      - Params: ${JSON.stringify(message.log?.params)}`);
        } catch (error) {
          logTest('Message parsing', false, `Error: ${error.message}`);
        }
      });

      ws.on('error', (error) => {
        logTest('WebSocket error handling', false, `Error: ${error.message}`);
      });

      try {
        // Test 3: eth_blockNumber (simple call, no params)
        log('\nTest 3: eth_blockNumber RPC Call');
        const messageCountBefore = state.messagesReceived.length;
        const result1 = await makeRPCCall('eth_blockNumber');

        // RPC response might fail (upstream provider issues), but that's OK for this test
        if (result1.result) {
          logTest('RPC proxied successfully', true, `Block number: ${result1.result}`);
        } else if (result1.error) {
          log(`    RPC provider returned error (this is OK): ${result1.error.message}`);
          logTest('RPC proxied successfully', true, 'Request reached upstream provider (returned error)');
        }

        // Wait for WebSocket message
        try {
          await waitFor(() => state.messagesReceived.length > messageCountBefore, 5000);
          logTest('WebSocket message received', true, 'Message received after RPC call');
        } catch (error) {
          logTest('WebSocket message received', false, 'No message received after RPC call');
        }

        // Test 4: eth_getBalance (with address parameter)
        log('\nTest 4: eth_getBalance RPC Call');
        const testAddress = '0x226d833075c26dbf9aa377de032342345808953a';
        const messageCountBefore2 = state.messagesReceived.length;
        const result2 = await makeRPCCall('eth_getBalance', [testAddress, 'latest']);

        // RPC response might fail (upstream provider issues), but that's OK for this test
        if (result2.result !== undefined) {
          logTest('RPC proxied successfully', true, `Balance: ${result2.result}`);
        } else if (result2.error) {
          log(`    RPC provider returned error (this is OK): ${result2.error.message}`);
          logTest('RPC proxied successfully', true, 'Request reached upstream provider (returned error)');
        }

        // Wait for WebSocket message
        try {
          await waitFor(() => state.messagesReceived.length > messageCountBefore2, 5000);
          const lastMessage = state.messagesReceived[state.messagesReceived.length - 1];

          if (lastMessage.log?.method === 'eth_getBalance') {
            logTest('WebSocket message contains correct method', true, 'Method matches eth_getBalance');

            if (lastMessage.log?.params?.[0]?.toLowerCase() === testAddress.toLowerCase()) {
              logTest('WebSocket message contains correct address', true, 'Address parameter matches');
            } else {
              logTest('WebSocket message contains correct address', false, 'Address parameter does not match');
            }
          } else {
            logTest('WebSocket message contains correct method', false, `Expected eth_getBalance, got ${lastMessage.log?.method}`);
          }
        } catch (error) {
          logTest('WebSocket message received', false, 'No message received after RPC call');
        }

        // Summary
        log('\n==================================================');
        log('  Test Summary');
        log('==================================================\n');

        log(`Total messages received: ${state.messagesReceived.length}`);
        log(`Tests passed: ${state.testsPassed}`);
        log(`Tests failed: ${state.testsFailed}`);

        if (state.testsFailed === 0) {
          log('\nSUCCESS: All tests passed!');
        } else {
          log('\nERROR: Some tests failed');
        }

        log('\n==================================================\n');

        ws.close();
        resolve(state.testsFailed === 0);

      } catch (error) {
        logTest('Test execution', false, `Error: ${error.message}`);
        ws.close();
        reject(error);
      }
    });

    ws.on('close', (code, reason) => {
      if (!state.wsConnected) {
        logTest('WebSocket connection', false, `Connection closed: ${code} ${reason || ''}`);
        reject(new Error('WebSocket connection failed'));
      }
    });

    ws.on('error', (error) => {
      clearTimeout(connectionTimeout);
      logTest('WebSocket connection', false, `Connection error: ${error.message}`);
      reject(error);
    });
  });
}

// Run the tests
runTests()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    log(`\nERROR: Fatal error: ${error.message}`);
    log('\nMake sure the local dev server is running:');
    log('  yarn start-miniflare');
    log('  or');
    log('  npx wrangler dev\n');
    process.exit(1);
  });
