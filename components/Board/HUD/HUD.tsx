import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import BackButton from "./BackButton";
import Round from "./Round";
import Timer from "./Timer";
import PopUp from "../../PopUp";

interface Props {}

const HUD: FunctionComponent<Props> = ({}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Container>
      <BackButton setClicked={setClicked} />
      <Timer />
      <Round />
      {clicked && <PopUp text={"Do you want to return to lobby?"} />}
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
