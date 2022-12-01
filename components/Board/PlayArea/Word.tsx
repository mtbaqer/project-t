import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { ScreenSizes } from "../../../Theme/ScreenSizes";
import { Word as WordType } from "../../../types/types";

interface Props {
  word: WordType;
  rotated: boolean;
}

const Word: FunctionComponent<Props> = ({ word, rotated }) => {
  return (
    <Container rotated={rotated}>
      <TargetWord>{word.targetWord}</TargetWord>
      {word.tabooWords.map((word, index) => (
        <TabooWord key={index}>{word}</TabooWord>
      ))}
    </Container>
  );
};

const Container = styled.div<{ rotated: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  ${({ rotated }) =>
    rotated
      ? css`
          transform: rotateZ(180deg);
        `
      : ""}
`;

const TargetWord = styled.p`
  margin-bottom: 20px;

  ${ScreenSizes.medium} {
    margin-bottom: 10px;
  }
`;

const TabooWord = styled.p``;

export default Word;
