import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { selectAtom, useAtomValue } from "jotai/utils";
import { roomAtom } from "../../atoms/room";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import Text from "../Text";
import Avatar from "./Avatar";
import { AvatarHeight, AvatarWidth, MiniAvatarHeight, MiniAvatarWidth } from "constants/avatars";

const playersAtom = selectAtom(roomAtom, (room) => room.players);

interface Props {
  isHinter?: boolean;
  timestamp: string;
  mini?: boolean;
}

const Player: FunctionComponent<Props> = ({ isHinter = false, timestamp, mini = false }) => {
  const players = useAtomValue(playersAtom);
  const user = players[timestamp];

  return user ? (
    <Container isHinter={isHinter} mini={mini}>
      <Content mini={mini}>
        <AvatarContainer>
          <Avatar srcs={user.avatarUrls} />
        </AvatarContainer>
        {!mini ? (
          <NameContainer>
            <Text>{user.name}</Text>
          </NameContainer>
        ) : null}
      </Content>
    </Container>
  ) : null;
};

const Container = styled.div<{ isHinter: boolean; mini: boolean }>`
  margin: 5px 0;
  background-color: #b116ed;
  width: 350px;
  height: 70px;
  transform: skewX(-5deg);
  border: 3px solid black;
  border-radius: 4px;
  box-shadow: 0 3px 0 0 black, 0 5px 0 0 rgba(0, 0, 0, 0.25);

  ${({ isHinter }) =>
    isHinter
      ? css`
          border: 3px solid rgb(67 216 162);
        `
      : ""}

  ${({ mini }) =>
    mini &&
    css`
      width: 65px;
      height: 65px;
      justify-content: center;
      background-color: transparent;
      border: none;
      box-shadow: none;
    `}

  ${ScreenSizes.medium} {
    width: 36vw;
  }
`;

const Content = styled.div<{ mini: boolean }>`
  position: relative;
  transform: skewX(5deg);
  height: 100%;
  display: flex;
  align-items: center;

  ${({ mini }) =>
    mini &&
    css`
      flex-direction: column;
    `}
`;

const AvatarContainer = styled.div`
  position: relative;
  width: ${MiniAvatarWidth}px;
  height: ${MiniAvatarHeight}px;
  flex-shrink: 0;
`;

const NameContainer = styled.div`
  max-width: 60%;
`;

export default Player;
