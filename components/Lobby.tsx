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
            <PlayersContainer ref={provided.innerRef} {...provided.droppableProps}>
              {room.spectators &&
                Object.entries(room.spectators).map(([timestamp, member]) => (
                  <Player key={member.id} user={member} isHinter={false} timestamp={timestamp} index={0} />
                ))}
            </PlayersContainer>
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

const PlayersContainer = styled.div`
  padding: 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const TeamsContainer = styled.div`
  padding: 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 8;
`;

export default Lobby;
