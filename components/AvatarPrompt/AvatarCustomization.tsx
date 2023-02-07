import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import { AvatarHeight, AvatarImagesMetadata, AvatarWidth } from "constants/avatars";
import { AvatarImageMetadata, StatePair } from "types/types";
import { LeftArrow, RightArrow } from "constants/icons";
import { Spaces } from "Theme/Spaces";
import { AvatarController } from "./AvatarPrompt";
import { toSrc } from "utils/toSrc";

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

  return (
    <Container>
      <ArrowsContainer>
        {controllers.map((controller, index) => (
          <Arrow key={index} onClick={decreaseValue(...controller)}>
            <Image {...LeftArrow} alt={LeftArrow.alt} draggable={false} />
          </Arrow>
        ))}
      </ArrowsContainer>
      <Images>
        {controllers.map(([state, metadata], index) => (
          <ImageContainer key={index}>
            <Image alt={metadata.alt} src={toSrc(metadata.path, state[0])} width={AvatarWidth} height={AvatarHeight} />
          </ImageContainer>
        ))}
      </Images>
      <ArrowsContainer>
        {controllers.map((controller, index) => (
          <Arrow key={index} onClick={increaseValue(...controller)}>
            <Image {...RightArrow} alt={RightArrow.alt} draggable={false} />
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
`;

const Arrow = styled.button`
  &:active {
    transform: scale(0.9);
  }
`;

const Images = styled.div`
  position: relative;
  width: ${AvatarWidth}px;
  height: ${AvatarHeight}px;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export default AvatarCustomization;
