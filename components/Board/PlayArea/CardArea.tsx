import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { roomAtom } from "../../../atoms/room";
import GuessButton from "./GuessButton";
import Card from "./Card";
import CardButtons from "./CardButtons";
import { ScreenSizes } from "../../../Theme/ScreenSizes";

interface Props {
  isHinter: boolean;
}

const CardArea: FunctionComponent<Props> = ({ isHinter }) => {
  const room = useAtomValue(roomAtom);

  const card = room.deck?.[room.currentCardIndex];

  return card ? (
    <Container>
      <SubContainer>
        <RotationContainer rotated={card.orientation % 2 == 1}>
          <FlippationContainer flipped={card.orientation % 4 >= 2}>
            <Card card={card} />
          </FlippationContainer>
        </RotationContainer>
        <CardButtons isHinter={isHinter} />
      </SubContainer>
      <GuessButton isHinter={isHinter} />
    </Container>
  ) : null;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubContainer = styled.div`
  position: relative;
  font-size: 16px;
  text-transform: uppercase;
  color: rgb(48, 26, 107);
  height: 400px;
  width: 300px;

  ${ScreenSizes.medium} {
    height: 36vh;
    width: 50vw;
    font-size: 14px;
  }
`;

const TransformationContainer = styled.div<{ flipped?: boolean; rotated?: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: all 0.5s ease;
`;

const RotationContainer = styled(TransformationContainer)`
  ${({ rotated }) =>
    rotated
      ? css`
          transform: rotateZ(180deg);
        `
      : css``};
`;

const FlippationContainer = styled(TransformationContainer)`
  ${({ flipped }) =>
    flipped
      ? css`
          transform: perspective(400px) rotateY(180deg);
        `
      : css``};
`;

export default CardArea;
