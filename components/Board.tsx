import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../atoms/room";
import useRoomActions from "../hooks/useRoomActions";
import Card from "./Card";
import Team from "./Team";
import Timer from "./Timer";

interface Props {}

const Board: FunctionComponent<Props> = ({}) => {
  const { onStartTurn, onPause, onResume, onCorrect, onTaboo } = useRoomActions();
  const room = useAtomValue(roomAtom);
  return (
    <>
      <HUD>
        <Timer isPlaying={room.status == "playing"} onPause={onPause} onResume={onResume} />
      </HUD>
      <ContentContainer>
        <Team teamIndex={0} team={room.teams[0]} currentTeamIndex={room.currentTeamIndex} />
        <MainContainer>
          <Card onCorrect={onCorrect} onTaboo={onTaboo} onStartTurn={onStartTurn} />
        </MainContainer>
        <Team teamIndex={1} team={room.teams[1]} currentTeamIndex={room.currentTeamIndex} />
      </ContentContainer>
    </>
  );
};

const HUD = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

export default Board;
