#!/usr/bin/env node
/**
 * DERP End-to-End Test Orchestration Script
 *
 * This script orchestrates a complete end-to-end test by:
 * 1. Starting the local Wrangler dev server
 * 2. Waiting for it to be ready
 * 3. Running the test script
 * 4. Tearing down the server
 * 5. Exiting with appropriate status code
 *
 * Usage: yarn test:e2e
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function log(message) {
  console.log(message);
}

function logStage(stage) {
  log(`\n${"=".repeat(50)}`);
  log(`  ${stage}`);
  log(`${"=".repeat(50)}\n`);
}

// State management
const state = {
  wranglerProcess: null,
  serverReady: false,
  serverStartTime: null,
  cleanupCalled: false,
};

// Configuration
const CONFIG = {
  serverReadyTimeout: 60000, // 60 seconds to wait for server
  serverReadyPatterns: [
    /Ready on/i,
    /http:\/\/localhost:\d+/i,
    /http:\/\/127\.0\.0\.1:\d+/i,
  ],
  wranglerCommand: "npx",
  wranglerArgs: ["wrangler", "dev", "--port", "8787"],
};

/**
 * Clean up resources
 */
function cleanup(exitCode = 0) {
  if (state.cleanupCalled) {
    return;
  }
  state.cleanupCalled = true;

  log("\nCleaning up...");

  if (state.wranglerProcess) {
    log("  Stopping Wrangler dev server...");
    try {
      // Kill the process group to ensure all child processes are terminated
      process.kill(-state.wranglerProcess.pid, "SIGTERM");
    } catch (error) {
      // Process might already be dead
      try {
        state.wranglerProcess.kill("SIGTERM");
      } catch (err) {
        // Ignore if already dead
      }
    }
    state.wranglerProcess = null;
  }

  log("  Cleanup complete\n");
  process.exit(exitCode);
}

/**
 * Set up signal handlers
 */
function setupSignalHandlers() {
  process.on("SIGINT", () => {
    log("\n\nWARNING: Received SIGINT (Ctrl+C)");
    cleanup(130);
  });

  process.on("SIGTERM", () => {
    log("\n\nWARNING: Received SIGTERM");
    cleanup(143);
  });

  process.on("uncaughtException", (error) => {
    log(`\n\nERROR: Uncaught exception: ${error.message}`);
    console.error(error);
    cleanup(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    log(`\n\nERROR: Unhandled rejection: ${reason}`);
    console.error(reason);
    cleanup(1);
  });
}

/**
 * Wait for server to be ready
 */
function waitForServerReady() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    let output = "";

    const checkOutput = (data) => {
      const text = data.toString();
      output += text;

      // Check if any ready pattern matches
      const isReady = CONFIG.serverReadyPatterns.some((pattern) =>
        pattern.test(output)
      );

      if (isReady) {
        state.serverReady = true;
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        log(`Server ready in ${elapsed}s\n`);
        resolve();
      }
    };

    state.wranglerProcess.stdout.on("data", checkOutput);
    state.wranglerProcess.stderr.on("data", checkOutput);

    // Timeout
    const timeout = setTimeout(() => {
      if (!state.serverReady) {
        reject(
          new Error(
            `Server failed to start within ${
              CONFIG.serverReadyTimeout / 1000
            }s`,
          ),
        );
      }
    }, CONFIG.serverReadyTimeout);

    // Clear timeout if server becomes ready
    state.wranglerProcess.stdout.on("data", () => {
      if (state.serverReady) {
        clearTimeout(timeout);
      }
    });
  });
}

/**
 * Start Wrangler dev server
 */
async function startWrangler() {
  logStage("Starting Wrangler Dev Server");

  log(`Command: ${CONFIG.wranglerCommand} ${CONFIG.wranglerArgs.join(" ")}`);
  log("Waiting for server to be ready...\n");

  state.wranglerProcess = spawn(CONFIG.wranglerCommand, CONFIG.wranglerArgs, {
    stdio: ["ignore", "pipe", "pipe"],
    detached: true, // Create a new process group
  });

  // Stream output with prefix
  state.wranglerProcess.stdout.on("data", (data) => {
    const lines = data.toString().trim().split("\n");
    lines.forEach((line) => {
      if (line) {
        log(`  [wrangler] ${line}`);
      }
    });
  });

  state.wranglerProcess.stderr.on("data", (data) => {
    const lines = data.toString().trim().split("\n");
    lines.forEach((line) => {
      if (line) {
        log(`  [wrangler] ${line}`);
      }
    });
  });

  state.wranglerProcess.on("error", (error) => {
    log(`\nERROR: Failed to start Wrangler: ${error.message}`);
    cleanup(1);
  });

  state.wranglerProcess.on("exit", (code, signal) => {
    if (!state.cleanupCalled) {
      log(
        `\nWARNING: Wrangler exited unexpectedly (code: ${code}, signal: ${signal})`,
      );
      cleanup(code || 1);
    }
  });

  // Wait for server to be ready
  try {
    await waitForServerReady();
  } catch (error) {
    log(`\nERROR: ${error.message}`);
    log("\nServer output:");
    cleanup(1);
  }
}

/**
 * Run the test script
 */
async function runTests() {
  logStage("Running Tests");

  return new Promise((resolve, reject) => {
    const testProcess = spawn("node", ["test-derp-local.js"], {
      stdio: "inherit",
      cwd: __dirname,
    });

    testProcess.on("error", (error) => {
      reject(new Error(`Failed to run tests: ${error.message}`));
    });

    testProcess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Tests failed with exit code ${code}`));
      }
    });
  });
}

/**
 * Main orchestration function
 */
async function main() {
  log("\n==================================================");
  log("  DERP End-to-End Test Orchestration");
  log("==================================================\n");

  const totalStartTime = Date.now();

  try {
    // Step 1: Set up signal handlers
    setupSignalHandlers();

    // Step 2: Start Wrangler
    await startWrangler();

    // Step 3: Wait a bit for server to stabilize
    log("Waiting for server to stabilize...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    log("Ready to run tests\n");

    // Step 4: Run tests
    await runTests();

    // Step 5: Success!
    const totalTime = ((Date.now() - totalStartTime) / 1000).toFixed(2);
    logStage("Test Results");
    log(`SUCCESS: All tests completed in ${totalTime}s`);

    cleanup(0);
  } catch (error) {
    const totalTime = ((Date.now() - totalStartTime) / 1000).toFixed(2);
    logStage("Test Results");
    log(`ERROR: Tests failed after ${totalTime}s`);
    log(`Error: ${error.message}`);

    cleanup(1);
  }
}

// Run the orchestration
main();
