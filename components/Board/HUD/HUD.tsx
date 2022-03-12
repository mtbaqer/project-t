import React, { FunctionComponent } from "react";
import styled from "styled-components";
import BackButton from "./BackButton";
import Timer from "./Timer";

interface Props {}

const HUD: FunctionComponent<Props> = ({}) => {
  return (
    <Container>
      <BackButton />
      <Timer />
      <Padding />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  z-index: 10;
`;

const Padding = styled.div`
  flex: 1;
`;

export default HUD;
