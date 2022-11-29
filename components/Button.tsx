import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { ScreenSizes } from "../Theme/ScreenSizes";

export interface Props {
  onClick?: () => void;
  text: String;
  imageSource?: string;
  big?: boolean;
}

const Button: FunctionComponent<Props> = ({ onClick, text, big, imageSource }) => {
  return (
    <Container big={big} as={onClick ? "button" : "div"} onClick={onClick}>
      {imageSource && <Image src={imageSource} alt="" width={23} height={29} />}
      <Strong>{text}</Strong>
    </Container>
  );
};

const Container = styled.div<{ big?: boolean; onClick?: () => void }>`
  background-color: rgb(255, 255, 255);
  border-color: rgb(48, 26, 107);
  color: rgb(48, 26, 107);
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 7px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  width: 175px;
  height: 50px;
  padding: 0 10px;
  transform: scale(1.2);
  margin-bottom: 25px;

  ${({ big }) =>
    big
      ? css`
          width: 425px;
          height: 100px;
        `
      : css``}

  ${({ onClick }) =>
    onClick
      ? css`
          width: 220px;

          &:hover {
            background-color: rgb(203, 181, 233);
          }
          &:active {
            margin-bottom: -8px;
            box-shadow: rgb(48, 26, 107) 0px 2px 0px 0px;
          }
        `
      : css``}

  ${ScreenSizes.medium} {
    width: 140px;
    height: 40px;
  }
`;

const Strong = styled.strong`
  font-size: 19px;
  flex: 1;
  font-weight: 800;

  ${ScreenSizes.medium} {
    font-size: 12px;
  }
`;

export default Button;
