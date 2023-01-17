import { useEffect, useState } from "react";

const Counter = ({ startTime, currentTime, calls }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startTime && currentTime) {
      setElapsedTime((currentTime - startTime) / 1000);
    }
  }, [startTime, currentTime]);

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = Math.floor(elapsedTime % 60);

  return calls < 1
    ? "-"
    : `${calls} calls, ${minutes > 9 ? minutes : `0${minutes}`}:${
        seconds > 9 ? seconds : `0${seconds}`
      } running`;
};

export default Counter;
