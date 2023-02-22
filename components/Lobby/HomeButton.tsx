import React, { FunctionComponent } from "react";
import styled from "styled-components";
import useRoomActions from "hooks/useRoomActions";
import Button from "../Button";
import { Spaces } from "Theme/Spaces";

interface Props {
  onClick: () => void;
}

const HomeButton: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <Container>
      <Button text="Leave" color="red" onClick={onClick} size="s" />
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
