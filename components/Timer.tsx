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
  const timer = useTimer(turnEndTime, isPlaying);
  return (
    <TimerContainer>
      <Text>{timer}</Text>
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
