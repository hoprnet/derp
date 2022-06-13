import React, { useState, useEffect, Fragment } from 'react';

import styled from "@emotion/styled";


function App() {
  const [log, setLog] = useState([]);
  const [ip, setIp] = useState('-');
  const [country, setCountry] = useState('-');
  const [status, setStatus] = useState('not connected');
  const [rpcUrl, setRpcUrl2] = useState('');
  const [chainId, setChainId] = useState('1');
  const [name, setName] = useState('DERP - ETH Mainnet');
  const [city, setCity] = useState(undefined);

  let currentWebSocket;

  const url = window.location.host;
  //const url = window.location.hostname + ':8788' //dev

  const updateIp = (ip, country) => {
    setIp(ip);
    setCountry(country)
  };

  const setConnectionStatus = () => {
    setStatus("connected")
  };

  const unsetConnectionStatus = () => {
    setStatus("not connected")
  };

  // const getIPInfo=()=>{
  //   fetch('https://ssl.geoplugin.net/json.gp?ip=79.184.238.42'
  //       ,{
  //         headers : {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //         }
  //       }
  //   )
  //       .then(function(response){
  //         console.log(response)
  //         return response.json();
  //       })
  //       .then(function(myJson) {
  //         console.log(myJson);
  //       });
  // }
  // useEffect(()=>{
  //   getIPInfo()
  // },[])

  const setRpcUrl = () => {
    // const div = document.getElementById("rpc-url");
    // div.textContent = `https://${url}/rpc/eth/mainnet`;
    setRpcUrl2(`https://${url}/rpc/eth/mainnet`);
  };

  const updateInfo = (cf) => {
    setRpcUrl2(cf.originalUrl);
    setCity(cf.city)

    // {
    //   "clientTcpRtt": 3,
    //     "longitude": "21.00260",
    //     "latitude": "52.24840",
    //     "tlsCipher": "AEAD-AES256-GCM-SHA384",
    //     "continent": "EU",
    //     "asn": 5617,
    //     "clientAcceptEncoding": "br, gzip, deflate",
    //     "country": "PL",
    //     "isEUCountry": "1",
    //     "colo": "WAW",
    //     "timezone": "Europe/Warsaw",
    //     "city": "Warsaw",
    //   "clientTrustScore": 1,
    //     "region": "Mazovia",
    //     "regionCode": "14",
    //     "asOrganization": "Orange Swiatlowod",
    //     "postalCode": "00-202",
    //     "originalUrl": "http://localhost:8788/rpc/xdai/mainnet"
    // }

    if (cf.originalUrl.includes("/rpc/eth/mainnet")) {
      setChainId('1');
      setName('DERP - ETH Mainnet');
    } else if (cf.originalUrl.includes("/rpc/xdai/mainnet")) {
      setChainId('100');
      setName('DERP - xDai Mainnet');
    } else if (cf.originalUrl.includes("/rpc/arbitrum/mainnet")) {
      setChainId('42161');
      setName('DERP - Arbitrum One');
    } else if (cf.originalUrl.includes("/rpc/avax/avalanche")) {
      setChainId('43114');
      setName('Avalanche Mainnet C-Chain');
    } else if (cf.originalUrl.includes("/rpc/sol/solana-neonlabs")) {
      setChainId('245022926');
      setName('DERP - NeonLabs Solana Devnet Proxy');
    }
  };

  const addLogEntry = (entry) => {
    setLog((prevState)=> {
      const newState = [entry, ...prevState]
      console.log(newState)
      return newState
    });
  };

  const join = () => {
    const wsUrl = `wss://${url}/client_logs/websocket`;
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
      updateInfo(data.cf);
    });

    ws.addEventListener("close", (event) => {
      console.log(
          "websocket closed, reconnecting:",
          event.code,
          event.reason
      );
      unsetConnectionStatus();
      setTimeout(join(), 500);
    });

    ws.addEventListener("error", (event) => {
      console.log("websocket error, reconnecting:", event);
      unsetConnectionStatus();
      setTimeout(join(), 1000);
    });
  };

  useEffect(() => {
    unsetConnectionStatus();
    setRpcUrl();
    join();
  }, []);


  const Location = styled.div`
    width: 100%;
    font-family: 'Source Code Pro';
    font-style: normal;
    font-size: 14px;
    
    th {
      font-size: 16px;
    }
    th, td {
      padding: 8px;
    }
    pre {
      max-width: 440px;
    }
    
    .hopr-table-header {
      background: linear-gradient(180deg, #0000B4 0.5%, #000050 100%);
      color: white;

      @media (min-width: 1040px) {

        .hopr-table-header-Location {
          width: 170px;
        }

        .hopr-table-header-IP {
          width: 160px;
        }

        .hopr-table-header-Status {
          width: 190px;
        }

        .hopr-table-header-MetaMask {
          //width: 76px;
        }

        .hopr-table-header-type {
          width: 76px;
        }

        .hopr-table-header-Timestamp {
          width: 157px;
        }

        .hopr-table-header-User-Agent {
          width: 208px;
        }

        .hopr-table-header-Method {
          width: 188px;
        }

        .hopr-table-header-Params {

        }
      }
    }
    
    
    .hopr-table-content-IP {
      overflow-wrap: anywhere;
    }
  `

  return (
    <Fragment>
      <Location>
        <table>
          <tr className={'hopr-table-header'}>
            <th className={'hopr-table-header-Location'}>Location</th>
            <th className={'hopr-table-header-IP'}>IP</th>
            <th className={'hopr-table-header-Status'}>Status</th>
            <th className={'hopr-table-header-MetaMask'}>MetaMask Network Settings</th>
          </tr>
          <tr>
            <td>{country}{city && `, ${city}`}</td>
            <td className={'hopr-table-content-IP'}>{ip}</td>
            <td>{status}</td>
            <td>
              <dl>
                <dt>Network Name</dt>
                <dd>{name}</dd>
                <dt>RPC Url</dt>
                <dd id="rpc-url">{rpcUrl}</dd>
                <dt>Chain ID</dt>
                <dd>{chainId}</dd>
              </dl>
            </td>
          </tr>
        </table>
      </Location>
      <Location>
        <table>
          <tr className={'hopr-table-header'}>
            <th className={'hopr-table-header-Timestamp'}>Timestamp</th>
            <th className={'hopr-table-header-type'}>Type</th>
            <th className={'hopr-table-header-User-Agent'}>User Agent</th>
            <th className={'hopr-table-header-Method'}>Method</th>
            <th className={'hopr-table-header-Params'}>Params</th>
          </tr>

          {
            log.map((entry, index)=>{
              return(
                <tr
                  key={`entry-${index}`}
                >
                  <td>{entry?.timestamp}</td>
                  <td>{entry?.type}</td>
                  <td>{entry?.userAgent}</td>
                  <td>{entry?.method}</td>
                  <td>
                    <pre>
                      { entry.params && JSON.stringify(entry.params, null, 2) }
                    </pre>
                  </td>
                </tr>
              )
              }
            )
          }

        </table>
      </Location>
    </Fragment>
  );
}

export default App;