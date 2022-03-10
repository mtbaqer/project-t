import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Timer from "./Timer";

interface Props {}

const HUD: FunctionComponent<Props> = ({}) => {
  return (
    <Container>
      <Timer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

export default HUD;
