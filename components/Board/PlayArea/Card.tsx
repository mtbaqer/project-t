import React, { FunctionComponent, useMemo } from "react";
import styled, { css } from "styled-components";
import Word from "./Word";
import { Card as CardType } from "../../../types/types";

interface Props {
  card: CardType;
}

const Card: FunctionComponent<Props> = ({ card }) => {
  const firstTwoWords = card.words.filter((_, i) => i < 2);
  const lastTwoWords = card.words.filter((_, i) => i >= 2);

  return (
    <>
      <Side>
        {firstTwoWords.map((word, index) => (
          <Word key={index} word={word} rotated={index % 2 != 0} />
        ))}
      </Side>
      <Side flipped>
        {lastTwoWords.map((word, index) => (
          <Word key={index} word={word} rotated={index % 2 != 0} />
        ))}
      </Side>
    </>
  );
};

const Side = styled.div<{ flipped?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
  background-color: rgb(255, 255, 255);
  backface-visibility: hidden;
  ${({ flipped }) =>
    flipped
      ? css`
          transform: rotateY(180deg);
        `
      : ""}
`;

export default Card;
