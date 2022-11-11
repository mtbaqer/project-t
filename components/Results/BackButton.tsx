import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import useRoomActions from "../../hooks/useRoomActions";

interface Props {}

const BackButton: FunctionComponent<Props> = ({}) => {
  const { onBackButton } = useRoomActions();
  return (
    <Container>
      <Button onClick={onBackButton}>
        <ImageContainer>
          <StyledImage src="/images/select.svg" alt="play button" width={14} height={12} />
        </ImageContainer>
        <Strong>BACK</Strong>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

const Button = styled.button`
  display: flex;
  position: relative;
  text-transform: uppercase;
  background-color: rgba(38, 28, 92, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.6);
  color: rgb(48, 26, 107);
  align-items: center;
  border-radius: 7px;
  width: 100px;
  height: 42px;
  padding: 0 10px;
  transform: scale(1.2);
  margin: 30px 30px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  &:active {
    margin-bottom: -8px;
    box-shadow: rgb(48, 26, 107) 0px 2px 0px 0px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1px;
`;

const StyledImage = styled(Image)`
  transform: rotate(90deg);
`;

const Strong = styled.strong`
  font-size: 16px;
  flex: 1;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Nunito";
  font-weight: 900;
`;

export default BackButton;
