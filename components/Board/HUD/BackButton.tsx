import { LeftArrow } from "constants/icons";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import useRoomActions from "../../../hooks/useRoomActions";
import Button from "../../Button";

interface Props {}

const BackButton: FunctionComponent<Props> = ({}) => {
  const { onBackButton } = useRoomActions();
  return (
    <Container>
      <Button text="LOBBY" size="s" color="red" onClick={onBackButton} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding-top: 30px;
`;

export default BackButton;
