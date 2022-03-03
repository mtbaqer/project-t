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

  const { onDragStart, onDragOver, onDragEnd, draggedUser } = useDnDActions();

  return (
    <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
      <SpectatorsContainer>
        <SpectatorsSubContainer>
          <Title>SPECTATORS</Title>
          <div>
            <Spectators>
              {room.spectators &&
                Object.entries(room.spectators).map(([timestamp, member], index) => (
                  <Player key={member.id} user={member} isHinter={false} timestamp={timestamp} index={index} />
                ))}
            </Spectators>
          </div>
        </SpectatorsSubContainer>
      </SpectatorsContainer>
      <ContentContainer>
        <TeamsContainer>
          {room.teams && room.teams.map((_team, i) => i % 2 === 0 && <Team key={i} teamIndex={i} showScore={false} />)}
        </TeamsContainer>
        <TeamsContainer>
          {room.teams && room.teams.map((_team, i) => i % 2 === 1 && <Team key={i} teamIndex={i} showScore={false} />)}
        </TeamsContainer>
        <DragOverlay>
          {draggedUser ? <Player index={0} timestamp={"3"} user={draggedUser} isHinter={false} /> : null}
        </DragOverlay>
      </ContentContainer>
    </DndContext>
  );
};

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

// is there an easy way to reuse these component or just have to extract to their own component class?
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
  padding: 5% 0;
  display: flex;
  flex-direction: column;
`;

export default Teams;
