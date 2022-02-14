import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { timeLeftAtom } from "../atoms/timeLeft";
import useTimer from "../hooks/useTimer";
import Image from "next/image";

interface Props {
  isPlaying: boolean;
  onPause: () => void;
  onResume: () => void;
}

const Timer: FunctionComponent<Props> = ({ isPlaying, onPause, onResume }) => {
  const timeLeft = useAtomValue(timeLeftAtom);

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
      <Button onClick={isPlaying ? onPause : onResume}>
        {isPlaying ? (
          <Image src="/images/pause.svg" alt="pause" width={30} height={30} />
        ) : (
          <Image src="/images/play.svg" alt="play" width={30} height={30} />
        )}
      </Button>
    </TimerContainer>
  );
};

const TimerContainer = styled.div`
  display: flex;
`;

const Text = styled.p``;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  margin-left: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  padding: 10px;
`;

export default Timer;
