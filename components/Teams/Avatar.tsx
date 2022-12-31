import { BaseAvatarImagePath, MiniAvatarHeight, MiniAvatarWidth } from "constants/avatars";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";

interface Props {}

const mockImages = [
  `${BaseAvatarImagePath}/colors/0.svg`,
  `${BaseAvatarImagePath}/faces/0.svg`,
  `${BaseAvatarImagePath}/accessories/2.svg`,
];

const Avatar: FunctionComponent<Props> = ({}) => {
  return (
    <>
      {mockImages.map((image) => (
        <ImageContainer key={image}>
          <Image src={image} width={MiniAvatarWidth} height={MiniAvatarHeight} alt="" />
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
