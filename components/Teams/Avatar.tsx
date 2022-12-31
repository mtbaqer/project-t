import { BaseAvatarImagePath, MiniAvatarHeight, MiniAvatarWidth } from "constants/avatars";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";

interface Props {
  srcs: string[];
}

const Avatar: FunctionComponent<Props> = ({ srcs }) => {
  return (
    <>
      {srcs.map((src) => (
        <ImageContainer key={src}>
          <Image src={src} width={MiniAvatarWidth} height={MiniAvatarHeight} alt="" />
        </ImageContainer>
      ))}
    </>
  );
};

const ImageContainer = styled.div`
  position: absolute;
  bottom: ${MiniAvatarHeight / 10}px;
  left: -${MiniAvatarWidth / 5}px;
  transform: rotate(15deg);
`;

export default Avatar;
