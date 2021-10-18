import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Card as CardType, RoomStatus } from "../types/types";

interface Props {
  status: RoomStatus;
  card?: CardType | null;
  onCorrect: () => void;
  onTaboo: () => void;
  onStartTurn: () => void;
}

const Card: FunctionComponent<Props> = ({ status, card, onCorrect, onTaboo, onStartTurn }) => {
  return (
    <Container>
      <WordsContainer>
        <TargetWord>{card?.targetWord}</TargetWord>
        {card?.tabooWords.map((word) => (
          <TabooWord>{word}</TabooWord>
        ))}
      </WordsContainer>
      {status === "waiting" || status === "paused" ? (
        <ButtonsContainer>
          <Button onClick={onStartTurn}>Start</Button>
        </ButtonsContainer>
      ) : (
        <ButtonsContainer>
          <Button onClick={onCorrect}>Correct</Button>
          <Button onClick={onTaboo}>Taboo</Button>
        </ButtonsContainer>
      )}
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
