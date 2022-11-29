import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../../atoms/room";
import useDnDActions from "../../hooks/useDnDActions";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import Player from "./Player";
import Spectators from "./Spectators";
import Team from "./Team";

interface Props {
  lobby?: boolean;
}

const Teams: FunctionComponent<Props> = ({ lobby = false }) => {
  const room = useAtomValue(roomAtom);

  const { onDragStart, onDragOver, onDragEnd, draggedTimestamp } = useDnDActions();

  return (
    <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
      <SpectatorsContainer>
        <Spectators lobby={lobby} />
      </SpectatorsContainer>
      <TeamsContainer>
        {room.teams.map((_team, i) =>
          i == 0 ? null : (
            <TeamContainer leftAlign={i % 2 === 1} key={i}>
              <Team title={`Team ${i}`} teamIndex={i} showScore={!lobby} />
            </TeamContainer>
          )
        )}
      </TeamsContainer>
      <DragOverlay style={{ cursor: "grabbing" }}>
        {draggedTimestamp ? <Player timestamp={draggedTimestamp} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

const SpectatorsContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 122px;
  width: 100%;
  margin: 18px 0;
`;

const TeamsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px 18px;
  padding: 0 18px;

  ${ScreenSizes.medium} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  height: 50%;
`;

const TeamContainer = styled.div<{ leftAlign: boolean }>`
  display: flex;
  flex: 1 0 40%;

  justify-content: ${({ leftAlign }) => (leftAlign ? "flex-start" : "flex-end")};

  align-self: start;
`;

export default Teams;
