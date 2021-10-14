import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Card } from "../types/types";

interface Props {
  card: Card;
  onCorrect: () => void;
  onTaboo: () => void;
}

const Name: FunctionComponent<Props> = ({ card, onCorrect, onTaboo }) => {
  return (
    <Container>
      <WordsContainer>
        <TargetWord>{card.targetWord}</TargetWord>
        {card.tabooWords.map((word) => (
          <TabooWord>{word}</TabooWord>
        ))}
      </WordsContainer>
      <ButtonsContainer>
        <Button onClick={onCorrect}>Correct</Button>
        <Button onClick={onTaboo}>Taboo</Button>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: purple;
  display: flex;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: pink;
`;

const WordsContainer = styled.div`
  padding: 20px;
  background-color: red;
  display: flex;
  flex-direction: column;
`;

const TargetWord = styled.p`
  margin-bottom: 20px;
`;

const TabooWord = styled.p``;

export default Name;
