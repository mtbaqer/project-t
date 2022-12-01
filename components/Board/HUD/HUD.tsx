import React, { FunctionComponent } from "react";
import styled from "styled-components";
import BackButton from "./BackButton";
import Round from "./Round";
import Timer from "./Timer";

interface Props {}

const HUD: FunctionComponent<Props> = ({}) => {
  return (
    <Container>
      <BackButton />
      <Timer />
      <Round />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 10;
  padding: 0 30px;
`;

export default HUD;
