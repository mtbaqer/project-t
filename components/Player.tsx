import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { User } from "../types/types";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  user: User;
  isHinter: boolean;
  timestamp: string;
  index: number;
}

const Player: FunctionComponent<Props> = ({ user, isHinter, timestamp, index }) => {
  return (
    <Draggable draggableId={timestamp} index={index}>
      {(provided, snapshot) => (
        <Container
          isHinter={isHinter}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <AvatarContainer>
            <Image alt="avatar image" src={"/images/avatar_placeholder.png"} width={49} height={56} />
          </AvatarContainer>
          <Name>{user.name}</Name>
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div<{ isHinter: boolean }>`
  margin: 5px 10px;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  max-width: 100%;
  border-bottom-left-radius: 100px;
  border-top-left-radius: 100px;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  ${({ isHinter }) =>
    isHinter
      ? css`
          border: 3px solid rgb(67 216 162);
        `
      : ""}
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
