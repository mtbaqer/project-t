import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../atoms/room";

interface Props {}

const Card: FunctionComponent<Props> = ({}) => {
  const room = useAtomValue(roomAtom);
  const card = room.deck?.[room.currentCardIndex];

  return (
    <Container>
      <TargetWord>{card?.targetWord}</TargetWord>
      {card?.tabooWords.map((word, index) => (
        <TabooWord key={index}>{word}</TabooWord>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-color: rgb(48, 26, 107);
  color: rgb(48, 26, 107);
  display: flex;
  align-items: center;
  border-radius: 7px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  width: 220px;
  padding: 10px;
  font-size: 22px;
  font-family: "Nunito";
  font-weight: 900;
  text-transform: uppercase;
`;

const TargetWord = styled.p`
  margin-bottom: 20px;
`;

const TabooWord = styled.p``;

export default Card;
