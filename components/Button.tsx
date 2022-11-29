import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { Breakpoints, ScreenSizes } from "../Theme/ScreenSizes";
import { useResponsive } from "react-hooks-responsive";

export interface Props {
  onClick?: () => void;
  text: String;
  imageSource?: string;
  big?: boolean;
}

const Button: FunctionComponent<Props> = ({ onClick, text, big, imageSource }) => {
  const { screenIsAtMost } = useResponsive(Breakpoints);
  const [imageWidth, imageHeight] = screenIsAtMost("medium") ? [20, 25] : [27.6, 34.8];

  return (
    <Container big={big} as={onClick ? "button" : "div"} onClick={onClick}>
      {imageSource && <Image src={imageSource} alt="" width={imageWidth} height={imageHeight} />}
      <Strong>{text}</Strong>
    </Container>
  );
};

const Container = styled.div<{ big?: boolean; onClick?: () => void }>`
  background-color: rgb(255, 255, 255);
  border-color: rgb(48, 26, 107);
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 7px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  width: 175px;
  height: 50px;
  padding: 0 10px;
  transform: scale(1.2);
  margin: 20px;

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
            margin-top: 28px;
            margin-bottom: 12px;
            box-shadow: rgb(48, 26, 107) 0px 2px 0px 0px;
          }
        `
      : css``}

  ${ScreenSizes.medium} {
    transform: scale(1);
    width: 140px;
    height: 40px;
    padding: 0 5px;
    border-radius: 4px;
    box-shadow: rgb(48 26 107) 0px 3px 0px 0px;
    margin: 0px;

    &:active {
      margin-top: 2px;
      margin-bottom: -2px;
      box-shadow: rgb(48, 26, 107) 0px 1px 0px 0px;
    }
  }
`;

const Strong = styled.strong`
  color: rgb(48, 26, 107);
  font-size: 19px;
  flex: 1;
  font-weight: 800;

  ${ScreenSizes.medium} {
    font-size: 12px;
  }
`;

export default Button;
