import { Close } from "constants/icons";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { ScreenSizes } from "Theme/ScreenSizes";
import { Spaces } from "Theme/Spaces";
import { Size } from "types/types";
import Button from "./Button";
import Text from "./Text";

interface Props {
  title?: string;
  titleSize?: Size;
  onClose?: () => void;
  size?: Size;
}

const Panel: FunctionComponent<Props> = ({ title, titleSize = "l", onClose, children, size = "m" }) => {
  return (
    <Container size={size}>
      {onClose && (
        <CloseButtonContainer>
          <Button size="s" icon={Close} color="red" onClick={onClose} />
        </CloseButtonContainer>
      )}
      {title && (
        <TitleContainer>
          <Text size={titleSize}>{title}</Text>
          <TitleContainerShade />
        </TitleContainer>
      )}
      <Content>{children}</Content>
      <BottomBorder />
    </Container>
  );
};

const Container = styled.div<{ size: Size }>`
  width: ${({ size }) => (size === "m" ? "390px" : "40%")};
  background-color: #105ce4;
  border: 3px solid black;
  border-radius: 5px;
  box-shadow: 0 3px 0 0 black, 0 5px 0 0 rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  flex-direction: column;

  ${ScreenSizes.medium} {
    width: 90%;
  }
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  height: 100%;
  top: 2px;
  right: -5%;
`;

const TitleContainer = styled.div`
  background-color: #248cf4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 0 0 #043896;
`;

const TitleContainerShade = styled.div`
  background-color: #045cb2;
  min-width: 100%;
  min-height: 5px;
`;

const Content = styled.div`
  padding: ${Spaces.medium};
  flex: 1;
`;

const BottomBorder = styled.div`
  background-color: #248cf4;
  min-width: 100%;
  min-height: 10px;
  box-shadow: 0 -2px 0 0 #043896;
`;

export default Panel;
