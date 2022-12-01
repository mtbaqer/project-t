import React, { FunctionComponent, HTMLProps } from "react";
import styled, { css } from "styled-components";
import { ScreenSizes } from "../Theme/ScreenSizes";

interface Props {
  styled?: boolean;
}

const Heading: FunctionComponent<Props & HTMLProps<HTMLHeadingElement>> = ({ children, styled = true }) => {
  return <H3 styled={styled}>{children}</H3>;
};

const H3 = styled.h3<{ styled: boolean }>`
  color: rgb(92, 255, 182);
  font-size: 22px;
  font-weight: 900;
  outline-color: black;
  text-transform: uppercase;
  text-shadow: rgb(23, 5, 87) 3px 0px 0px, rgb(23, 5, 87) 2.83487px 0.981584px 0px,
    rgb(23, 5, 87) 2.35766px 1.85511px 0px, rgb(23, 5, 87) 1.62091px 2.52441px 0px,
    rgb(23, 5, 87) 0.705713px 2.91581px 0px, rgb(23, 5, 87) -0.287171px 2.98622px 0px,
    rgb(23, 5, 87) -1.24844px 2.72789px 0px, rgb(23, 5, 87) -2.07227px 2.16926px 0px,
    rgb(23, 5, 87) -2.66798px 1.37182px 0px, rgb(23, 5, 87) -2.96998px 0.42336px 0px,
    rgb(23, 5, 87) -2.94502px -0.571704px 0px, rgb(23, 5, 87) -2.59586px -1.50383px 0px,
    rgb(23, 5, 87) -1.96093px -2.27041px 0px, rgb(23, 5, 87) -1.11013px -2.78704px 0px,
    rgb(23, 5, 87) -0.137119px -2.99686px 0px, rgb(23, 5, 87) 0.850987px -2.87677px 0px,
    rgb(23, 5, 87) 1.74541px -2.43999px 0px, rgb(23, 5, 87) 2.44769px -1.73459px 0px,
    rgb(23, 5, 87) 2.88051px -0.838247px 0px;

  ${ScreenSizes.medium} {
    font-size: 14px;
    border-radius: 6px 6px 0px 0px;
    text-shadow: rgb(23 5 87) 2px 0px 0px, rgb(23 5 87) 1.75517px 0.958851px 0px, rgb(23 5 87) 1.0806px 1.68294px 0px,
      rgb(23 5 87) 0.141474px 1.99499px 0px, rgb(23 5 87) -0.832294px 1.81859px 0px,
      rgb(23 5 87) -1.60229px 1.19694px 0px, rgb(23 5 87) -1.97998px 0.28224px 0px,
      rgb(23 5 87) -1.87291px -0.701566px 0px, rgb(23 5 87) -1.30729px -1.5136px 0px,
      rgb(23 5 87) -0.421592px -1.95506px 0px, rgb(23 5 87) 0.567324px -1.91785px 0px,
      rgb(23 5 87) 1.41734px -1.41108px 0px, rgb(23 5 87) 1.92034px -0.558831px 0px;
  }

  ${({ styled }) =>
    !styled &&
    css`
      text-shadow: none;
      color: rgb(255, 255, 255);

      ${ScreenSizes.medium} {
        text-shadow: none;
      }
    `}
`;

export default Heading;
