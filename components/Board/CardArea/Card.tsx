import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent, useMemo } from "react";
import styled, { css } from "styled-components";
import { roomAtom } from "../../../atoms/room";
import Word from "./Word";
import Image from "next/image";
import useRoomActions from "../../../hooks/useRoomActions";

interface Props {
  isHinter: boolean;
}

const Card: FunctionComponent<Props> = ({ isHinter }) => {
  const room = useAtomValue(roomAtom);
  const { onFlipCard, onRotateCard, onFlagCard } = useRoomActions();

  const card = room.deck?.[room.currentCardIndex];

  const firstTwoWords = useMemo(() => card?.words.filter((_, i) => i < 2), [card]);
  const lastTwoWords = useMemo(() => card?.words.filter((_, i) => i >= 2), [card]);

  return card ? (
    <Container>
      <RotationContainer rotated={card.orientation % 2 == 1}>
        <FlippationContainer flipped={card.orientation % 4 >= 2}>
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
        </FlippationContainer>
      </RotationContainer>
      <ButtonsContainer>
        <MiniButton onClick={onFlagCard}>
          <Image src="/images/flag.svg" alt="flag" width={39.6} height={44.4} />
        </MiniButton>
      </ButtonsContainer>
      <ButtonsContainer bottom>
        {isHinter && (
          <>
            <MiniButton onClick={onFlipCard}>
              <Image src="/images/flip.svg" alt="flip" width={39.6} height={44.4} />
            </MiniButton>
            <MiniButton onClick={onRotateCard}>
              <Image src="/images/rotate.svg" alt="rotate" width={39.6} height={44.4} />
            </MiniButton>
          </>
        )}
      </ButtonsContainer>
    </Container>
  ) : null;
};

const Container = styled.div`
  position: relative;
  font-size: 16px;
  font-family: "Nunito";
  font-weight: 900;
  text-transform: uppercase;
  color: rgb(48, 26, 107);
  height: 400px;
  width: 300px;
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

const ButtonsContainer = styled.div<{ bottom?: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  right: -55px;
  margin: 5px 0;
  ${({ bottom }) =>
    bottom
      ? css`
          bottom: 0;
        `
      : css`
          top: 0;
        `}
`;

const MiniButton = styled.button`
  margin: 5px 0;
  display: flex;
  align-items: center;
`;

export default Card;
