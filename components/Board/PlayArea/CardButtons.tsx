import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import useRoomActions from "../../../hooks/useRoomActions";
import Image from "next/image";
import useResponsive from "../../../hooks/useResponsive";

interface Props {
  isHinter: boolean;
}

const CardButtons: FunctionComponent<Props> = ({ isHinter }) => {
  const { onFlipCard, onRotateCard, onFlagCard } = useRoomActions();

  const { isTabletOrMobile } = useResponsive();
  const [imageWidth, imageHeight] = isTabletOrMobile ? [38.4, 44.4] : [48, 55.5];

  return (
    <>
      <ButtonsContainer>
        <MiniButton onClick={onFlagCard}>
          <Image src="/images/flag.svg" alt="flag" width={imageWidth} height={imageHeight} />
        </MiniButton>
      </ButtonsContainer>
      <ButtonsContainer bottom>
        {isHinter && (
          <>
            <MiniButton onClick={onFlipCard}>
              <Image src="/images/flip.svg" alt="flip" width={imageWidth} height={imageHeight} />
            </MiniButton>
            <MiniButton onClick={onRotateCard}>
              <Image src="/images/rotate.svg" alt="rotate" width={imageWidth} height={imageHeight} />
            </MiniButton>
          </>
        )}
      </ButtonsContainer>
    </>
  );
};

const ButtonsContainer = styled.div<{ bottom?: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  right: -60px;
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

export default CardButtons;
