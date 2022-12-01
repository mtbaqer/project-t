import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { ScreenSizes } from "../Theme/ScreenSizes";
import useResponsive from "../hooks/useResponsive";

export interface Props {
  onClick?: () => void;
  text: String;
  imageSource?: string;
  transparent?: boolean;
}

const Button: FunctionComponent<Props> = ({ onClick, text, imageSource, transparent }) => {
  const { isTabletOrMobile } = useResponsive();
  const [imageWidth, imageHeight] = isTabletOrMobile ? [20, 25] : [27.6, 34.8];

  return (
    <Container transparent={transparent} onClick={onClick}>
      {imageSource && <Image src={imageSource} alt="" width={imageWidth} height={imageHeight} />}
      <Strong>{text}</Strong>
    </Container>
  );
};

const Container = styled.button<{ transparent?: boolean }>`
  background-color: rgb(255, 255, 255);
  color: rgb(48, 26, 107);
  border-color: rgb(48, 26, 107);
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 7px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  width: 220px;
  height: 50px;
  padding: 0 10px;
  transform: scale(1.2);
  margin: 20px;
  &:hover {
    background-color: rgb(203, 181, 233);
  }
  &:active {
    margin-top: 28px;
    margin-bottom: 12px;
    box-shadow: rgb(48, 26, 107) 0px 2px 0px 0px;
  }

  ${({ transparent }) =>
    transparent &&
    css`
      background-color: rgba(38, 28, 92, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.6);
      color: rgba(255, 255, 255, 0.6);
      box-shadow: none;
      width: 120px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }

      &:active {
        margin: 20px;
        box-shadow: none;
      }
    `}

  ${ScreenSizes.medium} {
    transform: scale(1);
    width: 140px;
    height: 40px;
    padding: 0 5px;
    border-radius: 4px;
    box-shadow: rgb(48 26 107) 0px 3px 0px 0px;
    margin: 20px 0 0 0;

    &:active {
      margin-top: 22px;
      margin-bottom: -2px;
      box-shadow: rgb(48, 26, 107) 0px 1px 0px 0px;
    }

    ${({ transparent }) =>
      transparent &&
      css`
        box-shadow: none;
        border-radius: 7px;
        width: 100px;
        margin: 0;

        &:active {
          margin: 0;
          box-shadow: none;
        }
      `}
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
