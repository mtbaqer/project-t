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
}

const CardArea: FunctionComponent<Props> = ({ onCorrect, onTaboo, onStartTurn }) => {
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
        <ButtonsContainer>
          <Button onClick={onStartTurn}>Start</Button>
        </ButtonsContainer>
      ) : status === "paused" ? (
        <p>game is paused</p>
      ) : canSeeCard ? (
        <SubContainer>
          <Card />
          <ButtonsContainer>
            <Button onClick={onCorrect}>
              <Image src="/images/correct.svg" alt="correct" width={33} height={37} />
            </Button>
            <Button onClick={onTaboo}>
              <Image src="/images/wrong.svg" alt="wrong" width={33} height={37} />
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

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  right: -60px;
  bottom: 0px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding: 5px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
`;

export default CardArea;
