import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import useTimer from "../hooks/useTimer";
import { RoomStatus } from "../types/types";

interface Props {
  turnEndTime: number;
  status: RoomStatus;
}

const Timer: FunctionComponent<Props> = ({ turnEndTime, status }) => {
  const timer = useTimer(turnEndTime, status === "playing");
  return (
    <TimerContainer>
      <Text>{timer}</Text>
    </TimerContainer>
  );
};

const TimerContainer = styled.div``;
const Text = styled.p``;

export default Timer;
