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
      <div className="introduction">
        <h1>D.E.R.P.</h1>
        <h2>Dumb Ethereum RPC Provider</h2>
        <p>
          Crypto services are flashier and more user-friendly than ever, but few
          understand what goes on under the hood. The DERP tool from HOPR
          duplicates the functionality of a typical RPC provider, but it makes
          explicit the sheer amount of identifying data these services expose.
          As you’ll see, this happens as soon as you connect your wallet,
          <b>and all without you needing to make a transaction.</b>
        </p>
        <p>
          Add the DERP RPC endpoint to your crypto wallet to see exactly what
          information is being leaked about you every time you connect to a
          crypto service.
        </p>
      </div>
      <div className="image-privacy">
        <img src="/hopr_derp.gif" />
      </div>
      <div className="privacy">
        <h5>I thought web3 was private?</h5>
        <p>Not a chance.</p>
        <p>
          As soon as you start a wallet, it gets in touch with the RPC provider
          to find out basic information such as your token balances and network
          (Ethereum, Polygon, Gnosis Chain, etc.). When you connect your wallet
          to a web-based crypto service, the site immediately starts making
          calls to RPC endpoints to gather the data needed to populate the UI
          and facilitate the transactions. All this happens within a fraction of
          a second, <b>before you even start to make a transaction</b>.
        </p>
        <p>
          The associated metadata exposes your IP address. Some wallets like
          MetaMask expose details about ALL your addresses, not just the
          connected one.
        </p>
        <p>
          This is normally all hidden from you, the user, but DERP makes all
          these RPC calls explicit. It’s incredible to see just how much
          identifying data and metadata is shared by every popular crypto
          service.
        </p>
        <p>
          A malicious RPC provider could easily use this metadata to front-run
          transactions or share this information with third parties to link your
          real world identity to particular addresses, even if those addresses
          have never interacted on chain.
        </p>
        <p>
          Just follow the setup instructions to get started, then click the
          example buttons to learn how widespread the risks are.
        </p>
        <p>
          To read more visit this blog post:
          <a href="https://medium.com/hoprnet/intro-to-d-e-r-p-9e09a5e54904"
            >Intro to D.E.R.P.</a
          >
        </p>
      </div>
      <div className="buttons" id="show-info">
        <i
          className="button float-left"
          href=""
          onClick={()=>{toggleInfo('how-to')}}
          >Setup</i
        >
        <i
          className="button float-left"
          href=""
          onClick={()=>{toggleInfo('example-1')}}
          >Example 1: MetaMask Linkability</i
        >
        <i
          className="button float-left"
          href=""
          onClick={()=>{toggleInfo('example-2')}}
          >Example 2: NFT Frontrun</i
        >
        <i
          className="button float-left"
          href=""
          onClick={()=>{toggleInfo('example-3')}}
          >Example 3: DEX MEV</i
        >
      </div>
      <div className="how-to" id="how-to" hidden>
        <div className="how-to-button-close">
          <i
            className="button float-right"
            href=""
            onClick={()=>{toggleInfo('how-to')}}
            >Close</i
          >
        </div>
        <div className="how-to-image-1">
          <img src="/hopr_derp_setup_1.png" />
        </div>
        <div className="how-to-explanation-1">
          <h5>Setup</h5>
          <p>
            To start using DERP, you’ll need to set it up as your ETH RPC
            provider in your wallet. Instructions are for MetaMask, but DERP
            will work for any wallet that allows you to manage RPC endpoints.
            DERP currently only works with Ethereum mainnet, but other chains
            have the same problems and may be added in the future.
          </p>
          <p>Click “Networks” (1) and then “Add Network” (2)</p>
        </div>
        <div className="how-to-image-2">
          <img src="/hopr_derp_setup_2.png" />
        </div>
        <div className="how-to-explanation-2">
          <p>
            In the window that appears, fill in the fields by copy / pasting the
            RPC information in the DERP panel below this box (3).
          </p>
          <p>
            A warning will appear for Chain ID (4), because MetaMask already has
            an ETH RPC Network as standard. It’s safe to ignore this.
          </p>
          <p>
            Click Save (5). Visit a DeFi service of your choice and connect your
            wallet. DERP will now make transparent all the RPC calls which are
            normally hidden from you.
          </p>
          <p>
            <b
              >DERP doesn’t store or share your information or display
              inaccurate blockchain data: it simply reveals what goes on under
              the hood when you connect to an RPC endpoint.</b
            >
          </p>
        </div>
      </div>
      <div className="example-1" id="example-1" hidden={show !== "example-1"}>
        <div className="example-1-button-close">
          <i
            className="button float-right"
            href=""
            onClick={()=>{toggleInfo('example-1')}}
            >Close</i
          >
        </div>
        <div className="example-1-image">
          <img src="/hopr_rpc_linkability.gif" />
        </div>
        <div className="example-1-explanation">
          <h5>MetaMask Linkability</h5>
          <p>
            When you connect to your MetaMask, it needs to find out your
            balance(s) so it can populate the UI. To achieve this, a single call
            (eth_call) is sent requesting the balance of ALL your addresses.
            Even if those addresses never interacted on chain, the RPC provider
            now knows that they have the same owner.
          </p>
          <p>
            But it gets worse! Remember, the RPC provider knows your IP address.
            So in addition to linking all these accounts together, a malicious
            RPC provider could try to use the IP data to connect your addresses
            to your real-world identity.
          </p>
          <p>
            To see this in DERP, open MetaMask and look for a request called
            eth_call. In the data, between lots of dividing zeroes, you will see
            all of the addresses in your MetaMask, one after the other.
            <b
              >DERP doesn’t store or share your information, but a malicious RPC
              provider could.</b
            >
          </p>
          <p>
            Read more <a
              href="https://medium.com/hoprnet/derp-example-1-metamask-linkability-6b26ba42072f">here</a>.
          </p>
        </div>
      </div>
      <div className="example-2" id="example-2" hidden>
        <div className="example-2-button-close">
          <i
            className="button float-right"
            href=""
            onClick={()=>{toggleInfo('example-2')}}
            >Close</i
          >
        </div>
        <div className="example-2-image">
          <img src="/hopr_nft_frontrun.gif" />
        </div>
        <div className="example-2-explanation">
          <h5>NFT Frontrun</h5>
          <p>
            When you bid on an NFT in a marketplace, your wallet will send a
            request to estimate the necessary gas price. As part of this
            request, the RPC endpoint will learn your IP address, your wallet
            address, the precise NFT you intend to buy and the amount of your
            bid. All this happens before the transaction is confirmed, giving a
            malicious actor all the information they need to frontrun you by
            placing a higher bid or setting a higher gas price. In an NFT
            minting event, this could mean the difference between getting an NFT
            or missing out.
          </p>
          <p>
            DERP doesn’t work with all NFT marketplaces: OpenSea, for example,
            uses a private RPC provider which we can’t duplicate the
            functionality of. But that’s not necessarily better!
            <b
              >With crypto, you shouldn’t have to trust black box service
              providers with your data.</b
            >
          </p>
          <p>
            Read more <a
              href="https://medium.com/hoprnet/derp-example-2-nft-marketplace-7d3e4b4e8e2a">here</a>.
          </p>
        </div>
      </div>
      <div className="example-3" id="example-3" hidden>
        <div className="example-3-button-close">
          <i
            className="button float-right"
            href=""
            onClick={()=>{toggleInfo('example-3')}}
            >Close</i
          >
        </div>
        <div className="example-3-image">
          <img src="/hopr_dex_mev.gif" />
        </div>
        <div className="example-3-explanation">
          <h5>DEX MEV</h5>
          <p>
            When you use a DEX like Uniswap, many RPC requests are needed to
            populate the UI with data about your balances, the token pair you
            want to swap and details like price and slippage.
          </p>
          <p>
            All this information is sent to the RPC provider before your
            transaction is broadcast. A malicious provider can use this
            information to perform a sandwich attack on your transaction, maxing
            out the slippage and effectively taking money from you.
          </p>
          <p>
            Separately, DEX RPC endpoints also expose a large amount of
            identifying metadata. Simply browsing swaps reveals information
            about your portfolio, even if you never make a transaction. Combined
            with your IP address, which is also leaked, this can facilitate
            precise identification of you and your crypto holdings.
          </p>
          <p>
            Read more <a
              href="https://medium.com/hoprnet/derp-example-3-uniswap-mev-c2a8d3417c8">here</a>.
          </p>
        </div>
      </div>
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