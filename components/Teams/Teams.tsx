import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { roomAtom } from "../../atoms/room";
import useDnDActions from "../../hooks/useDnDActions";
import useResponsive from "../../hooks/useResponsive";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import { Spaces } from "../../Theme/Spaces";
import Player from "./Player";
import Spectators from "./Spectators";
import Team from "./Team";

interface Props {
  lobby?: boolean;
}

const Teams: FunctionComponent<Props> = ({ lobby = false }) => {
  const room = useAtomValue(roomAtom);

  const { onDragStart, onDragOver, onDragEnd, draggedTimestamp } = useDnDActions();

  const { isTabletOrMobile } = useResponsive();

  return (
    <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
      <Container moveTeamsDown={isTabletOrMobile && !lobby}>
        <SpectatorsContainer>
          <Spectators lobby={lobby} />
        </SpectatorsContainer>
        <TeamsContainer moveTeamsDown={isTabletOrMobile && !lobby}>
          {room.teams.map((_team, i) =>
            i == 0 ? null : (
              <TeamContainer leftAlign={i % 2 === 1} key={i}>
                <Team title={`Team ${i}`} teamIndex={i} showScore={!lobby} />
              </TeamContainer>
            )
          )}
        </TeamsContainer>
      </Container>
      <DragOverlay style={{ cursor: "grabbing" }}>
        {draggedTimestamp ? <Player timestamp={draggedTimestamp} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

const Container = styled.div<{ moveTeamsDown?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: ${Spaces.medium};

  ${({ moveTeamsDown }) =>
    moveTeamsDown &&
    css`
      justify-content: space-between;
      padding-bottom: 0;
    `}
`;

const SpectatorsContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 122px;
  width: 100%;
  margin: 18px 0;
`;

const TeamsContainer = styled.div<{ moveTeamsDown?: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px 18px;
  padding: 0 18px;

  ${ScreenSizes.medium} {
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${({ moveTeamsDown }) =>
      moveTeamsDown &&
      css`
        max-height: 33%;
        overflow: auto;
        padding-bottom: ${Spaces.medium};
      `}
  }
`;

const TeamContainer = styled.div<{ leftAlign: boolean }>`
  display: flex;
  flex: 1 0 40%;

  justify-content: ${({ leftAlign }) => (leftAlign ? "flex-start" : "flex-end")};

  align-self: start;
`;

export default Teams;
