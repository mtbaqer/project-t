import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { ScreenSizes } from "Theme/ScreenSizes";
import { Size } from "types/types";
import textStroke from "Theme/utils/textStroke";

interface Props {
  size?: Size;
}

const Text: FunctionComponent<Props> = ({ children, size = "m" }) => {
  return <Content size={size}>{children}</Content>;
};

const Content = styled.p<{ size: Size }>`
  letter-spacing: -0.02em;
  flex: 1;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 3px;

  ${({ size }) =>
    size === "s"
      ? css`
          font-size: 20px;
          ${ScreenSizes.medium} {
            font-size: 16px;
          }
          ${textStroke(2, "black")}
        `
      : size === "m"
      ? css`
          font-size: 30px;
          ${ScreenSizes.medium} {
            font-size: 20px;
          }
          ${textStroke(3, "black")}
        `
      : css`
          font-size: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          ${ScreenSizes.medium} {
            font-size: 24px;
          }
          ${textStroke(3, "black")}
        `}
`;

export default Text;
