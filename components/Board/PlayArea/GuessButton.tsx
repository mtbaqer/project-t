import React, { FunctionComponent } from "react";
import styled from "styled-components";
import useRoomActions from "../../../hooks/useRoomActions";
import { ScreenSizes } from "../../../Theme/ScreenSizes";
import { Spaces } from "../../../Theme/Spaces";
import Button from "../../Button";

interface Props {
  isHinter: boolean;
}

const GuessButton: FunctionComponent<Props> = ({ isHinter }) => {
  const { onCorrect, onTaboo } = useRoomActions();
  return (
    <Container>
      {isHinter ? <Button onClick={onCorrect} text="CORRECT" /> : <Button onClick={onTaboo} text="TABOO" />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${Spaces.medium};

  ${ScreenSizes.medium} {
    margin-top: ${Spaces.small};
  }
`;

export default GuessButton;
