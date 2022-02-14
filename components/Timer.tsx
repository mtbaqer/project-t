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
  let radius = 15;
  let circumference = 2 * radius * Math.PI;
  let progress = (60000 - timeLeft) / 60000;

  return (
    <Button onClick={isPlaying ? onPause : onResume}>
      <TimerContainer>
        <Svg>
          <circle
            strokeDasharray={circumference}
            strokeDashoffset={circumference * progress}
            cx={36}
            cy={36}
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth={2 * radius}
          />
        </Svg>
      </TimerContainer>
    </Button>
  );
};

const TimerContainer = styled.div`
  display: flex;
  border-radius: 100px;
  border: 6px solid white;
  margin-top: 18px;
  margin-bottom: -18px;
`;

const Button = styled.button`
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.5;
  }
`;

const Svg = styled.svg`
  width: 72px;
  height: 72px;
  transform: rotateY(-180deg) rotateZ(-90deg);
`;

export default Timer;
