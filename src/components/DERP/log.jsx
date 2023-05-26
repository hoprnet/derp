import React, { useEffect } from "react";

function DERPLog(props) {

    const stringsToMatch = [
        "0x4F5AdF25Ec1746CcfD8f95474E895A35cbAa4628",
        "0xCeb7DE2850FA11FC912fb8609e62C5385cdAeedE",
        "0x3b7A6D5A9c8C30E2F5f4Fba28e86A0672843D674",
      ];

  const highlightParams = (params) => {
    const regex = /^0x[a-fA-F0-9]{40}$|^[a-fA-F0-9]{40}$/;
    // console.log("@Params:", params);
      
      if (params.match("0x4F5AdF25Ec1746CcfD8f95474E895A35cbAa4628")) {
        console.log(params.match("4F5AdF25Ec1746CcfD8f95474E895A35cbAa4628"))
      }
      

    // if (conditionRegex.test(params)) {
    // Apply the desired highlighting logic
    //   const highlightedParams = params.replace(
    // conditionRegex,
    // `<span style="color: red; font-weight: bold;">$&</span>`
    //   );
    //   return highlightedParams;
    // }
    // return params;
  };

  useEffect(() => {
    console.log("rerendered DERP Log");
  }, []);

  return (
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
        {props.log.map((entry, index) => (
          <tr key={`entry-${index}`}>
            <td>{entry?.timestamp}</td>
            <td>{entry?.type}</td>
            <td>{entry?.userAgent}</td>
            <td>{entry?.method}</td>
            <td>
              <pre>
                {entry.params && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightParams(
                          JSON.stringify(
                              entry.params
                              , null, 2
                          )
                      ),
                    }}
                  />
                )}
              </pre>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DERPLog;
