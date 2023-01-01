import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Text from "./Text";
import { ButtonColor } from "Theme/Colors";
import { applyButtonColor } from "Theme/utils/applyButtonColor";

export interface Props {
  onClick?: () => void;
  text: String;
  color?: ButtonColor;
}

const Button: FunctionComponent<Props> = ({ onClick, text, color = "black" }) => {
  return (
    <ButtonContainer color={color} onClick={onClick}>
      <TopBorder color={color} />
      <ShinyCorner color={color} />
      <ContentContainer>
        <Text>{text}</Text>
      </ContentContainer>
      <BottomBorder color={color} />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{ color: ButtonColor }>`
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

const BottomBorder = styled(TopBorder)`
  ${applyButtonColor("bottomBorder")}
`;

const ContentContainer = styled.div`
  -ms-transform: skewX(5deg);
  -webkit-transform: skewX(5deg);
  transform: skewX(5deg);
  padding: 0 75px;
`;

export default Button;
