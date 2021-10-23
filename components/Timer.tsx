import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import useTimer from "../hooks/useTimer";

interface Props {
  turnEndTime: number;
  isPlaying: boolean;
  onPause: () => void;
  onResume: () => void;
}

const Timer: FunctionComponent<Props> = ({ turnEndTime, isPlaying, onPause, onResume }) => {
  const { timeLeft } = useTimer();

  function formatTimeLeft() {
    if (timeLeft <= 0) {
      return "00:00";
    }

    const minutesLeft = Math.floor((timeLeft / 1000 / 60) % 60);
    const secondsLeft = Math.floor((timeLeft / 1000) % 60);

    const formattedMinutes = `0${minutesLeft}`;
    const formattedSeconds = `${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <TimerContainer>
      <Text>{formatTimeLeft()}</Text>
      <Button onClick={isPlaying ? onPause : onResume}>{isPlaying ? "||" : "|>"}</Button>
    </TimerContainer>
  );
};

const TimerContainer = styled.div`
  display: flex;
`;

const Text = styled.p``;

const Button = styled.button`
  border: 1px solid black;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

export default Timer;
