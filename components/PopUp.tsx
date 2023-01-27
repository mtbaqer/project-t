import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { ScreenSizes } from "../Theme/ScreenSizes";
import Button from "./Button";

export interface Props {
  onClickYes?: () => void;
  onClickNo?: () => void;
  text: String;
}

const PopUp: FunctionComponent<Props> = ({ onClickNo, onClickYes, text }) => {
  return (
    <Container>
      <Strong>{text}</Strong>
      <Button text={"yes"} onClick={onClickYes} />
      <Button text={"no"} onClick={onClickNo} />
    </Container>
  );
};

const Container = styled.div<{ transparent?: boolean }>`
  background-color: rgb(255, 255, 255);
  color: rgb(48, 26, 107);
  border-color: rgb(48, 26, 107);
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 7px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  min-width: 220px;
  height: 170px;
  padding: 0 10px;
  transform: scale(1.2);
  margin: 20px;
  text-transform: uppercase;
  flex-direction: column;
  position: fixed;

  ${ScreenSizes.medium} {
    transform: scale(1);
    min-width: 140px;
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
        min-width: 0;
        max-width: 120px;
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
  margin: 0 20px;

  ${ScreenSizes.medium} {
    font-size: 12px;
  }
`;

export default PopUp;
