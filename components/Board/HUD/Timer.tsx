import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { timeLeftAtom } from "../../../atoms/timeLeft";
import { roomAtom } from "../../../atoms/room";
import useRoomActions from "../../../hooks/useRoomActions";

interface Props {}

const Timer: FunctionComponent<Props> = ({}) => {
  const { onPause, onResume } = useRoomActions();
  const room = useAtomValue(roomAtom);
  const timeLeft = useAtomValue(timeLeftAtom);
  let radius = 15;
  let circumference = 2 * radius * Math.PI;
  let progress = (60000 - timeLeft) / 60000;

  return room.status != "waiting" ? (
    <Button onClick={room.status == "playing" ? onPause : onResume}>
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
  border: 6px solid white;
`;

const Svg = styled.svg`
  width: 72px;
  height: 72px;
  transform: rotateY(-180deg) rotateZ(-90deg);
`;

export default Timer;
