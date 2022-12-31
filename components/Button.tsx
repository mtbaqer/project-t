import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { ScreenSizes } from "../Theme/ScreenSizes";
import useResponsive from "../hooks/useResponsive";
import Text from "./Text";

type ButtonColor = "yellow";

export interface Props {
  onClick?: () => void;
  text: String;
  transparent?: boolean;
}

const Button: FunctionComponent<Props> = ({ onClick, text, transparent }) => {
  return (
    <ButtonContainer transparent={transparent} onClick={onClick}>
      <TopBorder />
      <ShinyCorner />
      <ContentContainer>
        <Text>{text}</Text>
      </ContentContainer>
      <BottomBorder />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{ transparent?: boolean }>`
  background-color: #eec408;
  border: 3px solid black;
  -ms-transform: skewX(-5deg);
  -webkit-transform: skewX(-5deg);
  transform: skewX(-5deg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  border-radius: 4px;
  overflow: hidden;
  min-width: 210px;
  height: 70px;
  text-transform: uppercase;
  box-shadow: black 0 3px 0 0, 0 5px 0 0 rgba(0, 0, 0, 0.25);
  -webkit-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-background-clip: content-box;
  background-clip: content-box;
  position: relative;

  &:active {
    scale: calc(0.95);
  }
`;

const TopBorder = styled.span`
  height: 4px;
  background-color: #fbeb44;
  width: 100%;
`;

const ShinyCorner = styled.span`
  position: absolute;
  top: 1px;
  right: -8px;
  background-color: #faf99b;
  width: 16px;
  height: 5px;
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
`;

const BottomBorder = styled(TopBorder)`
  background-color: #a6532b;
`;

const ContentContainer = styled.div`
  -ms-transform: skewX(5deg);
  -webkit-transform: skewX(5deg);
  transform: skewX(5deg);
  padding: 0 75px;
`;

export default Button;
