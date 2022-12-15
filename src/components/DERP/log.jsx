import React, {useEffect} from "react";

function DERPLog(props) {
useEffect(() => {
    console.log('rerendered DERP Log');
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
        {props.log.map((entry, index) => {
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
  );
}

export default DERPLog;
