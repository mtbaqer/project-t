import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Button from "../../Button";

interface Props {
  onClick: () => void;
}

const BackButton: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <Container>
      <Button text="LOBBY" transparent onClick={onClick} imageSource="/images/chevron-left.svg" />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding-top: 30px;
`;

export default BackButton;
