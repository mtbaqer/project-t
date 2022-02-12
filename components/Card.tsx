import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../atoms/room";
import { userIdAtom } from "../atoms/user";

interface Props {
  onCorrect: () => void;
  onTaboo: () => void;
  onStartTurn: () => void;
}

const Card: FunctionComponent<Props> = ({ onCorrect, onTaboo, onStartTurn }) => {
  const userId = useAtomValue(userIdAtom);
  const room = useAtomValue(roomAtom);

  const card = room.deck?.[room.currentCardIndex];
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
        <>
          <WordsContainer>
            <TargetWord>{card?.targetWord}</TargetWord>
            {card?.tabooWords.map((word, index) => (
              <TabooWord key={index}>{word}</TabooWord>
            ))}
          </WordsContainer>
          <ButtonsContainer>
            <Button onClick={onCorrect}>Correct</Button>
            <Button onClick={onTaboo}>Taboo</Button>
          </ButtonsContainer>
        </>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  background-color: rgba(38, 28, 92, 0.5);
  display: flex;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(48 26 107) 0px 6px 0px 0px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const WordsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TargetWord = styled.p`
  margin-bottom: 20px;
`;

const TabooWord = styled.p``;

export default Card;
