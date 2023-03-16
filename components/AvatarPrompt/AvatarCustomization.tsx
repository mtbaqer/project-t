import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import { AvatarHeight, AvatarImagesMetadata, AvatarWidth } from "constants/avatars";
import { AvatarImageMetadata, StatePair } from "types/types";
import { LeftArrow, RightArrow } from "constants/icons";
import { Spaces } from "Theme/Spaces";
import { AvatarController } from "./AvatarPrompt";
import { toSrc } from "utils/toSrc";
import useResponsive from "hooks/useResponsive";
import { ScreenSizes } from "Theme/ScreenSizes";

interface Props {
  controllers: AvatarController[];
}

const AvatarCustomization: FunctionComponent<Props> = ({ controllers }) => {
  const increaseValue = (state: StatePair, metadata: AvatarImageMetadata) => () => {
    const [value, setValue] = state;
    setValue((value + 1) % metadata.count);
  };

  const decreaseValue = (state: StatePair, metadata: AvatarImageMetadata) => () => {
    const [value, setValue] = state;
    const newValue = value === 0 ? metadata.count - 1 : value - 1;
    setValue(newValue);
  };

  const { isTabletOrMobile } = useResponsive();

  const responsiveAvatarWidth = isTabletOrMobile ? AvatarWidth / 2 : AvatarWidth;
  const responsiveAvatarHeight = isTabletOrMobile ? AvatarHeight / 2 : AvatarHeight;

  return (
    <Container>
      <ArrowsContainer>
        {controllers.map((controller, index) => (
          <Arrow key={index} onClick={decreaseValue(...controller)}>
            <Image
              {...LeftArrow}
              alt={LeftArrow.alt}
              width={isTabletOrMobile ? LeftArrow.width * 0.7 : LeftArrow.width}
              height={isTabletOrMobile ? LeftArrow.height * 0.7 : LeftArrow.height}
              draggable={false}
            />
          </Arrow>
        ))}
      </ArrowsContainer>
      <Images width={responsiveAvatarWidth} height={responsiveAvatarHeight}>
        {controllers.map(([state, metadata], index) => (
          <ImageContainer key={index}>
            <Image
              alt={metadata.alt}
              src={toSrc(metadata.path, state[0])}
              width={responsiveAvatarWidth}
              height={responsiveAvatarHeight}
            />
          </ImageContainer>
        ))}
      </Images>
      <ArrowsContainer>
        {controllers.map((controller, index) => (
          <Arrow key={index} onClick={increaseValue(...controller)}>
            <Image
              {...RightArrow}
              alt={RightArrow.alt}
              width={isTabletOrMobile ? RightArrow.width * 0.7 : RightArrow.width}
              height={isTabletOrMobile ? RightArrow.height * 0.7 : RightArrow.height}
              draggable={false}
            />
          </Arrow>
        ))}
      </ArrowsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const ArrowsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: ${Spaces.medium};
  gap: ${Spaces.medium};

  ${ScreenSizes.medium} {
    padding-bottom: ${Spaces.xSmall};
    gap: ${Spaces.small};
  }
`;

const Arrow = styled.button`
  &:active {
    transform: scale(0.9);
  }
`;

const Images = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export default AvatarCustomization;
