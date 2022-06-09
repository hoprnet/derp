import React, { useState, useEffect } from 'react';


function App() {
  const [show, setShow] = useState('');

  let currentWebSocket;

  const tableCells = ["timestamp", "type", "userAgent", "method", "params"];

  const toggleInfo = (nodeId) => {
    const node = document.getElementById(nodeId);
    const showinfoDiv = document.getElementById("show-info");
    node.hidden = !node.hidden;
    showinfoDiv.hidden = !showinfoDiv.hidden;
    return false;
    // setShow(nodeId);
  };

  const updateIp = (ip, country) => {
    const ipDiv = document.getElementById("client-ip");
    ipDiv.textContent = ip;
    const countryDiv = document.getElementById("client-country");
    countryDiv.textContent = country;
  };

  const setConnectionStatus = () => {
    const connectionDiv = document.getElementById("client-connection-status");
    connectionDiv.textContent = "connected";
  };

  const unsetConnectionStatus = () => {
    const connectionDiv = document.getElementById("client-connection-status");
    connectionDiv.textContent = "not connected";
  };

  const setRpcUrl = () => {
    const div = document.getElementById("rpc-url");
    div.textContent = `https://${window.location.host}/rpc/eth/mainnet`;
  };

  const addLogEntry = (entry) => {
    const table = document.getElementById("client-logs");
    const tableBody = table.getElementsByTagName("tbody")[0];
    const tableRow = tableBody.insertRow(0);
    tableCells.forEach((name) => {
      const cell = tableRow.insertCell();
      let cellContent = document.createTextNode(entry[name]);
      if (name == "params") {
        cellContent = document.createElement("pre");
        const text = document.createTextNode(
            JSON.stringify(entry[name], null, 2)
        );
        cellContent.appendChild(text);
      }
      cell.appendChild(cellContent);
    });
  };

  const join = () => {
    const wsUrl = `wss://${window.location.host}/client_logs/websocket`;
    const ws = new WebSocket(wsUrl);

    ws.addEventListener("open", (event) => {
      console.log("websocket opened");
      currentWebSocket = ws;
      setConnectionStatus();
    });

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log("received websocket message", event.data);
      addLogEntry(data.log);
      updateIp(data.ip, data.country);
    });

    ws.addEventListener("close", (event) => {
      console.log(
          "websocket closed, reconnecting:",
          event.code,
          event.reason
      );
      unsetConnectionStatus();
      join();
    });

    ws.addEventListener("error", (event) => {
      console.log("websocket error, reconnecting:", event);
      unsetConnectionStatus();
      join();
    });
  };

  useEffect(() => {
    unsetConnectionStatus();
    setRpcUrl();
    join();
  }, []);

  return (
    <div className="wrapper">
      <div className="information">
        <div className="ip">
          <h4>IP</h4>
          <div id="client-ip"></div>
        </div>
        <div className="country">
          <h4>Country</h4>
          <div id="client-country"></div>
        </div>
        <div className="status">
          <h4>Status</h4>
          <div id="client-connection-status"></div>
        </div>
        <div className="settings">
          <h4>MetaMask Network Settings</h4>
          <dl>
            <dt>Network Name</dt>
            <dd>DERP - ETH Mainnet</dd>
            <dt>RPC Url</dt>
            <dd id="rpc-url"></dd>
            <dt>Chain ID</dt>
            <dd>1</dd>
          </dl>
        </div>
        <div className="logs">
          <h4>Logs</h4>
          <table id="client-logs">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Type</th>
                <th>User Agent</th>
                <th>Method</th>
                <th>Params</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;