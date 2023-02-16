import React, { FunctionComponent } from "react";
import styled from "styled-components";
import useRoomActions from "hooks/useRoomActions";
import Button from "../Button";
import { Spaces } from "Theme/Spaces";

interface Props {}

const HomeButton: FunctionComponent<Props> = ({}) => {
  const { onReturnToGenerateRoom } = useRoomActions();
  return (
    <Container>
      <Button text="Leave" color="red" onClick={onReturnToGenerateRoom} size="s" />
    </Container>
  );
};

//TODO: fix this so it's not absolute. Temp fix for now.
const Container = styled.div`
  position: absolute;
  top: ${Spaces.medium};
  left: ${Spaces.small};
`;

export default HomeButton;
