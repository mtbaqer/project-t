import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { timeLeftAtom } from "../../../atoms/timeLeft";
import { roomAtom } from "../../../atoms/room";
import useRoomActions from "../../../hooks/useRoomActions";
import { useResponsive } from "react-hooks-responsive";
import { Breakpoints, ScreenSizes } from "../../../Theme/ScreenSizes";

interface Props {}

const Timer: FunctionComponent<Props> = ({}) => {
  const { onPause, onResume } = useRoomActions();
  const room = useAtomValue(roomAtom);
  const timeLeft = useAtomValue(timeLeftAtom);
  const { screenIsAtMost } = useResponsive(Breakpoints);
  let radius = screenIsAtMost("medium") ? 10 : 15;
  let circumference = 2 * radius * Math.PI;
  let progress = (60000 - timeLeft) / 60000;
  const coordinates = (radius + 3) * 2;

  return room.status != "waiting" ? (
    <Button onClick={room.status == "playing" ? onPause : onResume}>
      <TimerContainer>
        <Svg>
          <circle
            strokeDasharray={circumference}
            strokeDashoffset={circumference * progress}
            cx={coordinates}
            cy={coordinates}
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth={2 * radius}
          />
        </Svg>
      </TimerContainer>
    </Button>
  ) : null;
};

const Button = styled.button`
  margin-top: 18px;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.5;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  border-radius: 100px;
  flex: 1;
  border: 6px solid white;
`;

const Svg = styled.svg`
  width: 72px;
  height: 72px;
  transform: rotateY(-180deg) rotateZ(-90deg);

  ${ScreenSizes.medium} {
    width: 52px;
    height: 52px;
  }
`;

export default Timer;
