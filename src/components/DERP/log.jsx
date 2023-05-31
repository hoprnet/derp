import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const HighlightedAddress = styled.mark`
  background-color: #ffa0a0;
  font-weight: bold;
`;

/**
Converts an array of addresses to an array of regular expressions.
@param {string[]} addresses - The array of addresses to convert.
@returns {RegExp[]} An array of regular expressions corresponding to the addresses.
*/
const addressesToRegexes = (addresses) => {
  return addresses.map((address) => {
    const addressWithoutOx = address.slice(2);

    // returns a regular expression to match string addresses that start with or without "0x",
    // globally and case-insensitive. Example: /(0x)?3b7A6D5A9c8C30E2F5f4Fba28e86A0672843D674/gi
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

  const highlightParams = (params) => {
    // make params a string and format it for <pre> tag.
    let stringifiedParams = JSON.stringify(params, null, 2);

    let newParams = [];
    let index = 0;

    regexes.forEach((regex) => {
      const matches = [...stringifiedParams.matchAll(regex)];
      if (matches.length === 0) {
        return;
      }

      matches.forEach((match) => {
        // index of the first match in the string.
        const matchIndex = match.index;

        // get the non-matching part of the string.
        const nonMatchingPart = stringifiedParams.slice(index, matchIndex);

        // get the matching part of the string (wallet address).
        const matchPart = match.at(0);

        if (nonMatchingPart) {
          newParams = [...newParams, <span>{nonMatchingPart}</span>];
        }

        // newParams will be an array with strings and <HighlightedAddress> elements.
        newParams = [
          ...newParams,
          <HighlightedAddress>{matchPart}</HighlightedAddress>,
        ];

        // sum of the first index match and address match length.
        index = matchIndex + match.at(0).length;
      });
    });

    // add params to new params OR add missing part of params to new params.
    if (index < stringifiedParams.length) {
      newParams = [...newParams, <span>{stringifiedParams.slice(index)}</span>];
    }

    return <pre>{newParams}</pre>;
  };

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
          const entryCopy = { ...entry };
          const highlightedParams = entryCopy.params
            ? highlightParams(entryCopy.params)
            : null;

          return (
            <tr key={`entry-${index}`}>
              <td>{entry?.timestamp}</td>
              <td>{entry?.type}</td>
              <td>{entry?.userAgent}</td>
              <td>{entry?.method}</td>
              <td>{highlightedParams}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DERPLog;
