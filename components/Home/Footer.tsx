import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Spaces } from "Theme/Spaces";
import Text from "../Text";

interface Props {}

const Footer: FunctionComponent<Props> = ({}) => {
  return (
    <Container>
      <TextContainer>
        <Text size="xs">{"Terms of Service"}</Text>
      </TextContainer>
      <TextContainer>
        <Text size="xs">{"Copyright @ 2023 Say Don't Say Group"}</Text>
      </TextContainer>
      <TextContainer>
        <Text size="xs">{"Credits"}</Text>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1% 5%;
  justify-content: center;
  align-items: center;
  background-color: #248cf4;
  box-shadow: 0 -2px 0 0 #043896;
`;

const TextContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Footer;
