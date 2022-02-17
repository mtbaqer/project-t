import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../atoms/room";
import { userIdAtom } from "../atoms/user";
import Card from "./Card";
import Image from "next/image";

interface Props {
  onCorrect: () => void;
  onTaboo: () => void;
  onStartTurn: () => void;
  onEndTurn: () => void;
}

const CardArea: FunctionComponent<Props> = ({ onCorrect, onTaboo, onStartTurn, onEndTurn }) => {
  const userId = useAtomValue(userIdAtom);
  const room = useAtomValue(roomAtom);

  const status = room.status;
  const currentTeam = room.teams[room.currentTeamIndex];
  const currentUserTimestamp = room.teams[room.currentTeamIndex]?.currentUserTimestamp;

  const canSeeCard = getCanSeeCard();

  function getCanSeeCard() {
    return !isInCurrentTeam() || isHinter();
  }

  function isHinter() {
    const hinterId = currentTeam?.members?.[currentUserTimestamp]?.id;
    return hinterId === userId;
  }

  function isInCurrentTeam(): boolean {
    return Object.values(currentTeam?.members || {}).findIndex((member) => member.id === userId) !== -1;
  }

  return (
    <Container>
      {status === "waiting" ? (
        <Button onClick={onStartTurn}>
          <Image src="/images/play.svg" alt="play button" width={23} height={29} />
          <Strong>START</Strong>
        </Button>
      ) : status === "paused" ? (
        <PauseContainer>
          <Div>
            <Strong>PAUSED</Strong>
          </Div>
          <Button onClick={onEndTurn}>
            <Strong>END TURN</Strong>
          </Button>
        </PauseContainer>
      ) : canSeeCard ? (
        <SubContainer>
          <Card />
          <ButtonsContainer>
            <Button onClick={onTaboo}>
              <Image src="/images/wrong.svg" alt="play button" width={23} height={29} />
              <Strong>TABOO</Strong>
            </Button>
            <Button onClick={onCorrect}>
              <Image src="/images/correct.svg" alt="play button" width={23} height={29} />
              <Strong>CORRECT</Strong>
            </Button>
          </ButtonsContainer>
        </SubContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin: 0 50px;

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

const Div = styled.div`
  background-color: rgb(255, 255, 255);
  border-color: rgb(48, 26, 107);
  color: rgb(48, 26, 107);
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 7px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  width: 175px;
  height: 50px;
  padding: 0 10px;
  transform: scale(1.2);
  margin-bottom: 25px;
`;

const PauseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

export default CardArea;
