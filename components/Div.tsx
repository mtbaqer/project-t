import React, { FunctionComponent, HTMLProps } from "react";
import styled from "styled-components";
import { ScreenSizes } from "../Theme/ScreenSizes";
import Heading from "./Heading";

const Div: FunctionComponent<HTMLProps<HTMLDivElement>> = ({ children, ...props }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 510px;
  height: 120px;
  background-color: rgba(38, 28, 92, 0.3);
  color: rgb(231, 224, 255);
  border-radius: 10px;
  font-size: 22px;
  font-weight: 900;

  ${ScreenSizes.medium} {
    width: 255px;
    height: 60px;
    font-size: 12px;
  }

  text-transform: uppercase;
`;

export default Div;
