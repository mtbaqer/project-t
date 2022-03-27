import React, { FunctionComponent } from "react";
import styled from "styled-components";
import useRoomActions from "../../../hooks/useRoomActions";
import Button from "../../Button";

interface Props {
  isHinter: boolean;
}

const GuessButton: FunctionComponent<Props> = ({ isHinter }) => {
  const { onCorrect, onTaboo } = useRoomActions();
  return (
    <Container>
      {isHinter ? (
        <Button onClick={onCorrect} imageSource="/images/correct.svg" text="CORRECT" />
      ) : (
        <Button onClick={onTaboo} imageSource="/images/wrong.svg" text="TABOO" />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

export default GuessButton;
