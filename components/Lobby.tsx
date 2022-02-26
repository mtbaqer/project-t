import { useAtomValue } from "jotai/utils";
import { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../atoms/room";
import Player from "./Player";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Image from "next/image";
import Team from "./Team";
import useLobbyActions from "../hooks/useLobbyActions";

interface Props {}

const Lobby: FunctionComponent<Props> = ({}) => {
  const { onPlayerChooseTeam, onAddTeam, onRemoveTeam, onStartGame } = useLobbyActions();
  const room = useAtomValue(roomAtom);

  function onDragEnd(result: DropResult) {
    onPlayerChooseTeam(Number(result.source.droppableId), Number(result.destination?.droppableId), result.draggableId);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* need to have draggable (player) inside of droppable, need to also implement hard coded logic*/}
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
      <ContentContainer>
        <Droppable droppableId="-1">
          {(provided, snapshot) => (
            <SpectatorsContainer ref={provided.innerRef} {...provided.droppableProps}>
              <Title>SPECTATORS</Title>
              <Spectator>
                {room.spectators &&
                  Object.entries(room.spectators).map(([timestamp, member]) => (
                    <Player key={member.id} user={member} isHinter={false} timestamp={timestamp} index={0} />
                  ))}
              </Spectator>
            </SpectatorsContainer>
          )}
        </Droppable>

        <TeamsContainer>
          {room.teams &&
            room.teams.map(
              (_team, i) =>
                i % 2 === 0 && (
                  <Droppable droppableId={i.toString()}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Team key={i} teamIndex={i} showScore={false} />
                      </div>
                    )}
                  </Droppable>
                )
            )}
        </TeamsContainer>

        <TeamsContainer>
          {room.teams &&
            room.teams.map(
              (_team, i) =>
                i % 2 === 1 && (
                  <Droppable droppableId={i.toString()}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Team key={i} teamIndex={i} showScore={false} />
                      </div>
                    )}
                  </Droppable>
                )
            )}
        </TeamsContainer>
      </ContentContainer>

      <ButtonContainer>
        <Button onClick={onStartGame}>
          <Image src="/images/play.svg" alt="play button" width={23} height={29} />
          <Strong>START GAME</Strong>
        </Button>
      </ButtonContainer>
    </DragDropContext>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
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
  background-color: rgba(38, 28, 92, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin: 5px 18px;
  position: relative;
  padding: 1px 0;
  flex-grow: 1;
  padding: 8px 0;
  width: 325px;
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

const Spectator = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const TeamsContainer = styled.div`
  padding: 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 8;
`;

export default Lobby;
