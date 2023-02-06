import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { ButtonColor, ButtonColors } from "Theme/Colors";
import { applyButtonColor } from "Theme/utils/applyButtonColor";
import { applyMiniButtonBorder } from "Theme/utils/applyMiniButtonBorder";

interface Props {
  onClick?: () => void;
  color?: ButtonColor;
}

const MiniButton: FunctionComponent<Props> = ({ children, onClick, color = "blue" }) => {
  return (
    <ButtonContainer color={color} onClick={onClick}>
      <BorderSubContainer color={color}>{children}</BorderSubContainer>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{ color: ButtonColor }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 55px;
  border-radius: 100%;
  box-shadow: black 0 3px 0 0, 0 5px 0 0 rgba(0, 0, 0, 0.25);
  border: 3px solid black;
  ${applyMiniButtonBorder()}
`;

const BorderSubContainer = styled.div<{ color: ButtonColor }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  width: 42px;
  border-radius: 100%;
  ${applyButtonColor("base")}
`;

export default MiniButton;
