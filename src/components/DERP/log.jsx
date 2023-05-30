import React, { useEffect, useState } from "react";

const addressesToRegexes = (addresses) => {
  return addresses.map((address) => {
    const addressWithoutOx = address.slice(2);
    return new RegExp(`(0x)?${addressWithoutOx}`, "gi");
  });
};

function DERPLog({ log, addresses }) {
  const [newLog, setNewLog] = useState([]);
  const [regexes, setRegexes] = useState([]);

  useEffect(() => {
    setNewLog(JSON.parse(JSON.stringify(log)));
  }, [log]);

  useEffect(() => {
    setRegexes(addressesToRegexes(addresses));
  }, [addresses]);

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
        {newLog.map((entry, index) => {
          let entryCopy = { ...entry };

          if (entryCopy.params && entryCopy.params.length > 0) {
            let stringifiedParams = JSON.stringify(entryCopy.params);

            regexes.forEach((regex) => {
              stringifiedParams = stringifiedParams.replace(
                regex,
                `<mark>$&</mark>`
              );
            });

            entryCopy.params = JSON.parse(stringifiedParams);
          }

          return (
            <tr key={`entry-${index}`}>
              <td>{entry?.timestamp}</td>
              <td>{entry?.type}</td>
              <td>{entry?.userAgent}</td>
              <td>{entry?.method}</td>
              <td>
                <pre>
                  {entryCopy.params && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(entryCopy.params, null, 2),
                      }}
                    />
                  )}
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
