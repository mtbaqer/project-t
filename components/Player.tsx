import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { User } from "../types/types";
import Image from "next/image";

interface Props {
  user: User;
}

const Player: FunctionComponent<Props> = ({ user }) => {
  return (
    <Container>
      <AvatarContainer>
        <Image alt="avatar image" src={"/images/avatar_placeholder.png"} width={49} height={56} />
      </AvatarContainer>
      <Name>{user.name}</Name>
    </Container>
  );
};

const Container = styled.div`
  margin: 5px 10px;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  max-width: 100%;
  border-bottom-left-radius: 100px;
  border-top-left-radius: 100px;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
`;

const AvatarContainer = styled.div`
  margin: 0 10px;
`;

const Name = styled.p`
  font-size: 16px;
  font-family: "Nunito";
  font-weight: 900;
  color: rgb(48, 26, 107);
  text-transform: uppercase;
`;

export default Player;
