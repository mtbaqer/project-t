import { useAtomValue } from "jotai/utils";
import { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../atoms/room";
import Player from "./Player";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Image from "next/image";
import Team from "./Team";

interface Props {}

const Lobby: FunctionComponent<Props> = ({}) => {
  const room = useAtomValue(roomAtom);

  function onDragEnd(result: DropResult) {}

  const user = { id: "userId", name: "some name", avatarUrl: "" };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* need to have draggable (player) inside of droppable, need to also implement hard coded logic*/}
      <ButtonContainer>
        <Button onClick={undefined}>
          <Image src="/images/correct.svg" alt="play button" width={23} height={29} />
          <Strong>ADD TEAM</Strong>
        </Button>
        <Button onClick={undefined}>
          <Image src="/images/correct.svg" alt="play button" width={23} height={29} />
          <Strong>REMOVE TEAM</Strong>
        </Button>
      </ButtonContainer>
      <Droppable droppableId="0">
        {(provided, snapshot) => (
          <PlayersContainer ref={provided.innerRef} {...provided.droppableProps}>
            {/* ugly, can fix by adding players array to room instead of adding members to team directly */}
            {room.teams.map(
              (team) =>
                team?.members &&
                Object.values(team?.members).map((member) => (
                  <Player user={member} isHinter={false} timestamp={String(Date.now())} index={0} />
                ))
            )}
          </PlayersContainer>
        )}
      </Droppable>
      <Droppable droppableId="1">
        {(provided, snapshot) => (
          <TeamsContainer ref={provided.innerRef} {...provided.droppableProps}>
            {room.teams.map((_team, i) => (
              <Team key={i} teamIndex={i} />
            ))}
          </TeamsContainer>
        )}
      </Droppable>
      <ButtonContainer>
        <Button onClick={undefined}>
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

const PlayersContainer = styled.div`
  padding: 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TeamsContainer = styled.div`
  padding: 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Lobby;
