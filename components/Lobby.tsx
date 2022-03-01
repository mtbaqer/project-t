import { useAtomValue } from "jotai/utils";
import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { roomAtom } from "../atoms/room";
import { DragDropContext, DropResult, Droppable, Direction } from "react-beautiful-dnd";
import Image from "next/image";
import Team from "./Team";
import useLobbyActions from "../hooks/useLobbyActions";
import { SortableContext } from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import Player from "./Player";

interface Props {}

const Lobby: FunctionComponent<Props> = ({}) => {
  const { onPlayerChooseTeam, onAddTeam, onRemoveTeam, onStartGame } = useLobbyActions();
  const room = useAtomValue(roomAtom);
  const [activeId, setActiveId] = useState<string | null>(null);

  function onDragStart(result: DragStartEvent) {
    setActiveId(result.active.id);
  }

  function onDragEnd(result: DragEndEvent) {
    // onPlayerChooseTeam(Number(result.source.droppableId), Number(result.destination?.droppableId), result.draggableId);
    console.log(result);
    setActiveId(null);
  }
  function onDragOver(result: DragEndEvent) {
    console.log(result);
  }

  return (
    <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
      {/* <CenterContainer>
        <CenterSubContainer>
          <ButtonContainer>
            <Button onClick={onAddTeam}>
              <Image src="/images/correct.svg" alt="play button" width={23} height={29} />
              <Strong>ADD TEAM</Strong>
            </Button>
            <Button onClick={onRemoveTeam}>
              <Image src="/images/correct.svg" alt="play button" width={23} height={29} />
              <Strong>REMOVE TEAM</Strong>
            </Button>
          </ButtonContainer>
          <Button onClick={onStartGame}>
            <Image src="/images/play.svg" alt="play button" width={23} height={29} />
            <Strong>START GAME</Strong>
          </Button>
        </CenterSubContainer>
      </CenterContainer> */}
      {/* <SpectatorsContainer>
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
      </SpectatorsContainer> */}
      <ContentContainer>
        <TeamsContainer>
          {room.teams && room.teams.map((_team, i) => i % 2 === 0 && <Team key={i} teamIndex={i} showScore={false} />)}
        </TeamsContainer>
        {/* <TeamsContainer>
          {room.teams && room.teams.map((_team, i) => i % 2 === 1 && <Team key={i} teamIndex={i} showScore={false} />)}
        </TeamsContainer> */}
        <DragOverlay>
          {activeId ? (
            <Player
              index={0}
              timestamp={"2"}
              user={{
                id: "321",
                name: "some name 2",
                avatarUrl: "",
              }}
              isHinter={false}
            />
          ) : null}
        </DragOverlay>
      </ContentContainer>
    </DndContext>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CenterContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: rgb(255, 255, 255);
  border-color: rgb(48, 26, 107);
  color: rgb(48, 26, 107);
  display: flex;
  align-items: center;
  border-radius: 7px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  width: 220px;
  height: 50px;
  padding: 0 10px;
  transform: scale(1.2);
  margin: 13px 50px 0px 50px;
  bottom: 20px;

  &:hover {
    background-color: rgb(203, 181, 233);
  }
  &:active {
    margin-bottom: -8px;
    box-shadow: rgb(48, 26, 107) 0px 2px 0px 0px;
  }
`;

const Strong = styled.strong`
  font-size: 19px;
  flex: 1;
  font-weight: 800;
`;

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

export default Lobby;
