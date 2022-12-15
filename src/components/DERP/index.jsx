import React, { useState, useEffect } from "react";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styled from "@emotion/styled";
import { chains } from "../../shared/chains.js";

import Map from "../Map";

function App() {
  const [log, setLog] = useState([]);
  const [ip, setIp] = useState("-");
  const [country, setCountry] = useState("-");
//  const [status, setStatus] = useState("not connected");
  const [rpcUrl, setRpcUrl2] = useState("-");
  const [chainId, setChainId] = useState("-");
  const [name, setName] = useState("-");
  const [city, setCity] = useState("-");
  const [coordinates, setCoordinates] = useState({
    long: undefined,
    lat: undefined,
  });


  useEffect(() => {
    console.log('coordinates', coordinates)
  }, [coordinates]);

  //let currentWebSocket;

  const url = window.location.host;
  //const url = window.location.hostname + ':8788' //dev

  const updateIp = (ip, country) => {
    setIp(ip);
    setCountry(country);
  };

  // const setConnectionStatus = () => {
  //   setStatus("connected");
  // };

  // const unsetConnectionStatus = () => {
  //   setStatus("not connected");
  // };

  const updateInfo = (cf) => {
    setRpcUrl2(cf.originalUrl);
    setCity(cf.city);

    let chosenChain = chains.filter((chain) =>
      cf.originalUrl.includes(chain.derpUrl)
    )[0];
    if (chosenChain) {
      setChainId(chosenChain.chainId);
      setName("DERP - " + chosenChain.name);
    }

    if (cf.longitude && cf.latitude) {
      setCoordinates({
        long: cf.longitude,
        lat: cf.latitude,
      });
    }
  };

  const addLogEntry = (entry) => {
    setLog((prevState) => {
      const newState = [entry, ...prevState];
      return newState;
    });
  };

  const joinWebSocket = () => {
    const wsUrl = `wss://${url}/client_logs/websocket`;
    const ws = new WebSocket(wsUrl);

    ws.addEventListener("open", (event) => {
      console.log("websocket opened");
      // currentWebSocket = ws;
     // setConnectionStatus();
    });

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      addLogEntry(data.log);
      updateIp(data.ip, data.country);
      updateInfo(data.cf);
    });

    ws.addEventListener("close", (event) => {
      console.log("websocket closed, reconnecting:", event.code, event.reason);
    //  unsetConnectionStatus();
      setTimeout(joinWebSocket(), 1000);
    });

    ws.addEventListener("error", (event) => {
      console.log("websocket error, reconnecting:", event);
     // unsetConnectionStatus();
      //   setTimeout(join(), 1000);
    });
  };

  useEffect(() => {
    joinWebSocket();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   // DEV
  //   const cf = {
  //     clientTcpRtt: 3,
  //     longitude: "21.00260",
  //     latitude: "52.24840",
  //     tlsCipher: "AEAD-AES256-GCM-SHA384",
  //     continent: "EU",
  //     asn: 5617,
  //     clientAcceptEncoding: "br, gzip, deflate",
  //     country: "PL",
  //     isEUCountry: "1",
  //     colo: "WAW",
  //     timezone: "Europe/Warsaw",
  //     city: "Warsaw",
  //     clientTrustScore: 1,
  //     region: "Mazovia",
  //     regionCode: "14",
  //     asOrganization: "Orange Swiatlowod",
  //     postalCode: "00-202",
  //     originalUrl: "http://localhost:8788/rpc/xdai/mainnet",
  //   };
  //   updateInfo(cf);
  // }, []);

  const Location = styled.div`
    width: 100%;
    font-family: "Source Code Pro";
    font-style: normal;
    font-size: 14px;

    th {
      font-size: 16px;
    }
    th,
    td {
      padding: 8px;
    }
    pre {
      max-width: 440px;
    }

    .hopr-table-header {
      background: linear-gradient(180deg, #0000b4 0.5%, #000050 100%);
      color: white;

      @media (min-width: 1040px) {
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

    table.network-settings {
      th {
        font-size: 14px;
        font-weight: 400;
      }
      th:first-of-type {
        font-weight: 600;
        width: 130px;
      }

      .rpc-url {
        overflow-wrap: anywhere;
      }
    }

    table.network-settings > tbody > tr:nth-of-type(1) > th {
      border-top: 0.1rem solid #e1e1e1;
    }

    @media (max-width: 699px) {
      td.no-padding-on-mobile {
        padding: 0;
      }
    }

    table.user-table {
      border: none;
    }

    table.user-table > tbody  > tr > td {
        border-bottom: none;
      }

      .status-connected{
        margin-right: 8px;
        margin-bottom: -4px;
        width: 20px;
        height: 20px;
        color: darkgreen;
      }
  `;

  return (
    <div style={{width: '100%'}}>
      <Location>
        <table className={"user-table"}>
          <tbody>
            <tr>
              <td className={"no-padding-on-mobile"} style={{width: '100%'}}>
                <table className="network-settings">
                  <tbody>
                    <tr>
                      <th>Country</th>
                      <th>{country}</th>
                    </tr>
                    <tr>
                      <th>City</th>
                      <th>{city}</th>
                    </tr>
                    <tr>
                      <th>IP</th>
                      <th>{ip}</th>
                    </tr>
                    {/* <tr>
                      <th>Status</th>
                      <th>
                        {
                          status === "connected" ? 
                            <>
                              <CheckCircleIcon className="status-connected"/> 
                              {status} 
                            </>
                            : status
                        } 
                      </th>
                    </tr> */}
                    <tr>
                      <th>Network Name</th>
                      <th>{name}</th>
                    </tr>
                    <tr>
                      <th>RPC Url</th>
                      <th id="rpc-url" className="rpc-url">
                        {rpcUrl}
                      </th>
                    </tr>
                    <tr>
                      <th>Chain ID</th>
                      <th>{chainId}</th>
                    </tr>
                    <tr className={"mobile-only"}>
                      <th colSpan="2">
                        {coordinates.lat && coordinates.long && (
                          <div>
                            <Map
                              coordinates={coordinates}
                              style={{ width: "100%", height: "275px" }}
                            />
                          </div>
                        )}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className={"not-on-mobile"}>
                {coordinates.lat && coordinates.long && (
                  <div>
                    <Map
                      coordinates={coordinates}
                      style={{
                        width: "450px",
                        height: "275px",
                        maxWidth: "45vw",
                      }}
                    />
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Location>
      <Location>
        <table className={"showRowAnimate"}>
          <thead>
            <tr className={"hopr-table-header"}>
              <th className={"hopr-table-header-Timestamp"}>Timestamp</th>
              <th className={"hopr-table-header-type"}>Type</th>
              <th className={"hopr-table-header-User-Agent"}>User Agent</th>
              <th className={"hopr-table-header-Method"}>Method</th>
              <th className={"hopr-table-header-Params"}>Params</th>
            </tr>
          </thead>
          <tbody>
            {log.map((entry, index) => {
              return (
                <tr key={`entry-${index}`}>
                  <td>{entry?.timestamp}</td>
                  <td>{entry?.type}</td>
                  <td>{entry?.userAgent}</td>
                  <td>{entry?.method}</td>
                  <td>
                    <pre>
                      {entry.params && JSON.stringify(entry.params, null, 2)}
                    </pre>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Location>
    </div>
  );
}

export default App;
