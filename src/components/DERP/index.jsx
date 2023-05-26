import React, { useState, useEffect } from "react";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { chains } from "../../shared/chains.js";
import Map from "../Map";
import { Location } from "./styled"
import DERPLog from "./log"
import Counter from "../Counter";
import { utils } from "ethers";


function DERP() {
  const [log, setLog] = useState([]);
  const [ip, setIp] = useState("-");
  const [country, setCountry] = useState("-");
  // const [status, setStatus] = useState("not connected");
  const [rpcUrl, setRpcUrl2] = useState("-");
  const [numberOfCalls, set_numberOfCalls] = useState(0);
  const [startTimeEpoch, set_startTimeEpoch] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [chainId, setChainId] = useState("-");
  const [name, setName] = useState("-");
  const [city, setCity] = useState("-");
  const [lastAddresesUsed, set_lastAddresesUsed] = useState([]);
  const [coordinates, setCoordinates] = useState({
    long: undefined,
    lat: undefined,
  });

  const [ethCallData, setEthCallData] = useState("");
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    if (ethCallData) {
      return;
    }

    // 0xf0002ea9 is the signature for balances(address[],address[]).
    const foundEthCall = log.find(
      (entry) =>
        entry.method === "eth_call" &&
        entry.params.at(0).data.startsWith("0xf0002ea9")
    );
    if (foundEthCall) {
      const data = foundEthCall.params.at(0).data;
      setEthCallData(data);
    }
  }, [log, ethCallData]);

  const getAddressesFromEthCall = (data) => {
    const abi = ["function balances(address[],address[])"];
    const iface = new utils.Interface(abi);
    
    // decode eth call data.
    const { args } = iface.parseTransaction({ data });
    setAddresses(args.at(0))
  };

  useEffect(() => {
    if (ethCallData) {
      getAddressesFromEthCall(ethCallData)
    }
  }, [ethCallData]);

  // check logs and highligh address leaks
  useEffect(() => {
    const regex = /^0x[a-fA-F0-9]{40}$|^[a-fA-F0-9]{40}$/;
    const params = log.map(entry => entry.params)

  }, [log])

  useEffect(() => {
    if (numberOfCalls > 0 && !startTimeEpoch) {
      console.log("@numberOfCalls > 0");
      set_startTimeEpoch(Date.now());
    }
  }, [numberOfCalls, startTimeEpoch]);

  useEffect(() => {
    if (!startTimeEpoch) return;

    console.log("@setCurrentTime");
    setCurrentTime(Date.now());
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      console.log("@setCurrentTime (interval)");
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimeEpoch]);

  //let currentWebSocket;

  // !!! CHANGE THIS
  const url = 'derp.hoprnet.org'
  // !!! CHANGE THIS
  // const url = window.location.host;
  //const url = window.location.hostname + ':8788' //dev

  const updateIp = (newIp, newCountry) => {
    if (newIp !== ip) setIp(newIp);
    if (newCountry !== country) setCountry(newCountry);
  };

  // const setConnectionStatus = () => {
  //   setStatus("connected");
  // };

  // const unsetConnectionStatus = () => {
  //   setStatus("not connected");
  // };

  const updateInfo = (cf) => {
    if(cf.originalUrl !== rpcUrl) setRpcUrl2(cf.originalUrl);
    if(cf.city !== city)  setCity(cf.city);

    let chosenChain = chains.filter((chain) =>
      cf.originalUrl.includes(chain.derpUrl)
    )[0];

    if(chosenChain && chosenChain.chainId !== chainId) {
      setChainId(chosenChain.chainId);
      setName("DERP - " + chosenChain.name);
    }

    if ( 
        (cf.longitude && cf.latitude) &&
        (coordinates.long !== cf.longitude || coordinates.lat !== cf.latitude) 
      ) {
        setCoordinates({
          long: cf.longitude,
          lat: cf.latitude,
        });
      }
  };

  const addLogEntry = (entry) => {
    setLog((prevState) => {
      const newState = [...prevState, entry];
      return newState;
    });
  };

  const getAndParseDataFromEntry = (entry) => {
    if(entry.method === "eth_getBalance" && entry.params && entry.params[0]) {
      let address = entry.params[0];
      set_lastAddresesUsed((prevState) => {
        let index = prevState.indexOf(address)
        if (index === -1){
          return [address, ...prevState].splice(0,3);
        } else {
          let newState = prevState.filter(elem => elem !== address);
          return [address, ...newState].splice(0,3);
        }
      });
    }
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
      getAndParseDataFromEntry(data.log);
      // filterAndSetEthCallData(data.log);
      updateIp(data.ip, data.country);
      updateInfo(data.cf);
      set_numberOfCalls(prevNumberOfCalls => prevNumberOfCalls + 1);
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
  //   getAndParseDataFromEntry({
  //     "timestamp": "2023-05-03T16:09:54.430Z",
  //     "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
  //     "type": "request",
  //     "method": "eth_getBalance",
  //     "params": [
  //       "0x226d833075c26dbf9aa377de032342345808953a4",
  //       "0x1a79459"
  //     ]
  //   });
  // }, []);

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
                    <tr>
                      <th>
                        {lastAddresesUsed.length < 2 ? 'Last address used' : `Last ${lastAddresesUsed.length} addresses used`}
                      </th>
                      <th>
                        { lastAddresesUsed.length !== 0 && lastAddresesUsed.map((address, index) =>
                            <p style={{marginBottom: 0}}>{address}</p>
                        )}
                        { lastAddresesUsed.length === 0 && '-'}
                      </th>
                    </tr>
                    <tr>
                      <th>Counter</th>
                      <th>
                        <Counter
                          startTime={startTimeEpoch}
                          currentTime={currentTime}
                          numberOfCalls={numberOfCalls}
                        />
                      </th>
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
        <DERPLog
          log={log}
        />
      </Location>
    </div>
  );
}

export default DERP;
