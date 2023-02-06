import React, { FunctionComponent } from "react";
import styled from "styled-components";
import useRoomActions from "hooks/useRoomActions";
import Button from "../Button";

interface Props {}

const HomeButton: FunctionComponent<Props> = ({}) => {
  const { onReturnToGenerateRoom } = useRoomActions();
  return (
    <Container>
      <Button text="LEAVE GAME" onClick={onReturnToGenerateRoom} imageSource="/images/chevron-left.svg" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-grow: 1;
`;

export default HomeButton;
