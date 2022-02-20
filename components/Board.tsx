import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../atoms/room";
import useRoomActions from "../hooks/useRoomActions";
import CardArea from "./CardArea";
import Team from "./Team";
import Timer from "./Timer";

interface Props {}

const Board: FunctionComponent<Props> = ({}) => {
  const { onStartTurn, onPause, onResume, onCorrect, onTaboo, onEndTurn } = useRoomActions();
  const room = useAtomValue(roomAtom);
  return (
    <>
      <HUD>
        <Timer onPause={onPause} onResume={onResume} />
      </HUD>
      <ContentContainer>
        <TeamsContainer>{room.teams.map((_team, i) => i % 2 === 0 && <Team key={i} teamIndex={i} />)}</TeamsContainer>
        <MainContainer>
          <CardArea onCorrect={onCorrect} onTaboo={onTaboo} onStartTurn={onStartTurn} onEndTurn={onEndTurn} />
        </MainContainer>
        <TeamsContainer>{room.teams.map((_team, i) => i % 2 !== 0 && <Team key={i} teamIndex={i} />)}</TeamsContainer>
      </ContentContainer>
    </>
  );
};

const HUD = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const TeamsContainer = styled.div`
  padding: 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default Board;
