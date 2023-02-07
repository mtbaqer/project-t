import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import useRoomActions from "../../../hooks/useRoomActions";
import Image from "next/image";
import useResponsive from "../../../hooks/useResponsive";
import { Flag, Flippation, Rotation } from "constants/icons";
import MiniButton from "@/components/MiniButton";
import { Spaces } from "Theme/Spaces";

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
          <Image {...Flag} alt={Flag.alt} />
        </MiniButton>
      </ButtonsContainer>
      <ButtonsContainer bottom>
        {isHinter && (
          <>
            <MiniButton onClick={onFlipCard}>
              <Image {...Flippation} alt={Flippation.alt} />
            </MiniButton>
            <MiniButton onClick={onRotateCard}>
              <Image {...Rotation} alt={Rotation.alt} />
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
  gap: ${Spaces.xSmall};
`;

export default CardButtons;
