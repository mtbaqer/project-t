import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import Text from "./Text";
import { ButtonColor } from "Theme/Colors";
import { applyButtonColor } from "Theme/utils/applyButtonColor";
import { Size } from "types/types";
import { Spaces } from "Theme/Spaces";

export interface Props {
  onClick?: () => void;
  text: String;
  color?: ButtonColor;
  size?: Size;
}

const Button: FunctionComponent<Props> = ({ onClick, text, color = "black", size = "m" }) => {
  return (
    <ButtonContainer color={color} size={size} onClick={onClick}>
      <TopBorder color={color} />
      <ShinyCorner color={color} />
      <ContentContainer size={size}>
        <Text size={size}>{text}</Text>
      </ContentContainer>
      <BottomBorder color={color} />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{ color: ButtonColor; size: Size }>`
  ${applyButtonColor("base")}
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
  text-transform: uppercase;
  box-shadow: black 0 3px 0 0, 0 5px 0 0 rgba(0, 0, 0, 0.25);
  -webkit-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-background-clip: content-box;
  background-clip: content-box;
  position: relative;

  ${({ size }) =>
    size === "s"
      ? css`
          min-width: 110px;
          height: 60px;
        `
      : size === "m"
      ? css`
          min-width: 210px;
          height: 70px;
        `
      : css``}

  &:active {
    scale: calc(0.95);
  }
`;

const TopBorder = styled.span<{ color: ButtonColor }>`
  height: 4px;
  width: 100%;
  ${applyButtonColor("topBorder")}
`;

const ShinyCorner = styled.span<{ color: ButtonColor }>`
  position: absolute;
  top: 1px;
  right: -8px;
  ${applyButtonColor("corner")}
  width: 16px;
  height: 5px;
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
`;

const ContentContainer = styled.div<{ size: Size }>`
  -ms-transform: skewX(5deg);
  -webkit-transform: skewX(5deg);
  transform: skewX(5deg);
  width: 100%;
  display: flex;
  position: relative;

  ${({ size }) =>
    size !== "s" &&
    css`
      padding: 0 ${Spaces.medium};
    `};
`;

const BottomBorder = styled(TopBorder)`
  ${applyButtonColor("bottomBorder")}
`;

export default Button;
