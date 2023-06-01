import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const BoldText = styled.span`
  font-weight: 600;
`;

const Counter = ({ startTime, currentTime, numberOfCalls }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = Math.floor(elapsedTime % 60);

  useEffect(() => {
    if (startTime && currentTime) {
      setElapsedTime((currentTime - startTime) / 1000);
    }
  }, [startTime, currentTime]);

  useEffect(() => {
    if (hours > 24) {
      setElapsedTime(0);
    }
  }, [hours]);

  return numberOfCalls < 1 ? (
    "-"
  ) : (
    <>
      <BoldText>{numberOfCalls}</BoldText> calls, {""}
      <BoldText>{hours > 9 ? `${hours}` : `0${hours}`}:</BoldText>
      <BoldText>{minutes > 9 ? `${minutes}` : `0${minutes}`}:</BoldText>
      <BoldText>{seconds > 9 ? `${seconds}` : `0${seconds}`}</BoldText> running
    </>
  );
};

export default Counter;
