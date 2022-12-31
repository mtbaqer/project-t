import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { ScreenSizes } from "Theme/ScreenSizes";
import { Size } from "types/types";
import textStroke from "utils/textStroke";

interface Props {
  size?: Size;
}

const Text: FunctionComponent<Props> = ({ children, size = "m" }) => {
  return <Content>{children}</Content>;
};

const Content = styled.p`
  font-size: 30px;
  letter-spacing: -0.02em;
  flex: 1;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 3px;

  ${ScreenSizes.medium} {
    font-size: 20px;
  }

  ${textStroke(3, "black")}
`;

export default Text;
