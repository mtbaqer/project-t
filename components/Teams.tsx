import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../atoms/room";
import useDnDActions from "../hooks/useDnDActions";
import Player from "./Player";
import Team from "./Team";

interface Props {}

const Teams: FunctionComponent<Props> = ({}) => {
  const room = useAtomValue(roomAtom);

  const { onDragStart, onDragOver, onDragEnd, draggedTimestamp } = useDnDActions();

  return (
    <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
      <SpectatorsContainer>
        <Team title={`Spectators`} teamIndex={0} showScore={false} grid />
      </SpectatorsContainer>
      <TeamsContainer>
        {room.teams.map((_team, i) =>
          i == 0 ? null : (
            <TeamContainer leftAlign={i % 2 === 1} key={i}>
              <Team title={`Team ${i}`} teamIndex={i} showScore={false} />
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
`;

const SpectatorsSubContainer = styled.div`
  background-color: rgba(38, 28, 92, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin: 5px 18px;
  position: relative;
  padding: 5% 0;
  padding: 8px 0;
  width: 80%;
`;

const Title = styled.h3`
  color: rgb(92, 255, 182);
  font-size: 22px;
  font-family: "Nunito";
  font-weight: 900;
  outline-color: black;
  text-shadow: rgb(23, 5, 87) 3px 0px 0px, rgb(23, 5, 87) 2.83487px 0.981584px 0px,
    rgb(23, 5, 87) 2.35766px 1.85511px 0px, rgb(23, 5, 87) 1.62091px 2.52441px 0px,
    rgb(23, 5, 87) 0.705713px 2.91581px 0px, rgb(23, 5, 87) -0.287171px 2.98622px 0px,
    rgb(23, 5, 87) -1.24844px 2.72789px 0px, rgb(23, 5, 87) -2.07227px 2.16926px 0px,
    rgb(23, 5, 87) -2.66798px 1.37182px 0px, rgb(23, 5, 87) -2.96998px 0.42336px 0px,
    rgb(23, 5, 87) -2.94502px -0.571704px 0px, rgb(23, 5, 87) -2.59586px -1.50383px 0px,
    rgb(23, 5, 87) -1.96093px -2.27041px 0px, rgb(23, 5, 87) -1.11013px -2.78704px 0px,
    rgb(23, 5, 87) -0.137119px -2.99686px 0px, rgb(23, 5, 87) 0.850987px -2.87677px 0px,
    rgb(23, 5, 87) 1.74541px -2.43999px 0px, rgb(23, 5, 87) 2.44769px -1.73459px 0px,
    rgb(23, 5, 87) 2.88051px -0.838247px 0px;
`;

const Spectators = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const TeamsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TeamContainer = styled.div<{ leftAlign: boolean }>`
  display: flex;
  flex: 1 0 50%;

  justify-content: ${({ leftAlign }) => (leftAlign ? "flex-start" : "flex-end")};
`;

export default Teams;
