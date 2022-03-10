import React, { FunctionComponent, memo } from "react";
import styled, { css } from "styled-components";
import { User } from "../../types/types";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { selectAtom, useAtomValue } from "jotai/utils";
import { roomAtom } from "../../atoms/room";

const playersAtom = selectAtom(roomAtom, (room) => room.players);

interface Props {
  isHinter?: boolean;
  timestamp: string;
}

const Player: FunctionComponent<Props> = ({ isHinter = false, timestamp }) => {
  const players = useAtomValue(playersAtom);
  const user = players[timestamp];

  return user ? (
    <Container isHinter={isHinter}>
      <AvatarContainer isHinter={isHinter}>
        <Image alt="avatar image" src={"/images/avatar_placeholder.png"} width={49} height={56} />
      </AvatarContainer>
      <Name>{user.name}</Name>
    </Container>
  ) : null;
};

const Container = styled.div<{ isHinter: boolean }>`
  margin: 5px 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  width: 336px;
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

const AvatarContainer = styled.div<{ isHinter: boolean }>`
  margin: 0 10px;

  ${({ isHinter }) =>
    isHinter
      ? css`
          margin: -3px 10px -3px 7px;
        `
      : ""}
`;

const Name = styled.p`
  font-size: 16px;
  font-family: "Nunito";
  font-weight: 900;
  color: rgb(48, 26, 107);
  text-transform: uppercase;
`;

export default Player;
