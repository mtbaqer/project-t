import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { selectAtom, useAtomValue } from "jotai/utils";
import { roomAtom } from "../../atoms/room";
import { useResponsive } from "react-hooks-responsive";
import { Breakpoints, ScreenSizes } from "../../Theme/ScreenSizes";

const playersAtom = selectAtom(roomAtom, (room) => room.players);

const AvatarDefaultWidth = 49;
const AvatarDefaultHeight = 56;

interface Props {
  isHinter?: boolean;
  timestamp: string;
  mini?: boolean;
}

const Player: FunctionComponent<Props> = ({ isHinter = false, timestamp, mini = false }) => {
  const { screenIsAtMost } = useResponsive(Breakpoints);
  const players = useAtomValue(playersAtom);
  const user = players[timestamp];

  return user ? (
    <Container isHinter={isHinter} mini={mini}>
      <AvatarContainer isHinter={isHinter}>
        <OverFlowContainer>
          <StyledImage
            alt="avatar image"
            src={user.avatarUrl ? `/images/avatars/${user.avatarUrl}.svg` : "/images/avatar_placeholder.png"}
            width={AvatarDefaultWidth}
            height={AvatarDefaultHeight}
          />
        </OverFlowContainer>
      </AvatarContainer>
      {!mini ? <Name>{user.name}</Name> : null}
    </Container>
  ) : null;
};

const Container = styled.div<{ isHinter: boolean; mini: boolean }>`
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

  ${({ mini }) =>
    mini &&
    css`
      width: 65px;
      height: 65px;
      justify-content: center;
      background-color: transparent;
    `}

    ${ScreenSizes.medium} {
    width: 100%;
  }
`;

const AvatarContainer = styled.div<{ isHinter: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 7px;
  border-radius: 100%;
  border: 2px solid rgb(1, 36, 66);
  width: ${AvatarDefaultWidth}px;
  height: ${AvatarDefaultWidth}px;
  overflow: visible;

  ${({ isHinter }) =>
    isHinter
      ? css`
          margin: 4px 7px 4px 4px;
        `
      : ""}
`;

const OverFlowContainer = styled.div`
  margin-top: ${AvatarDefaultWidth - AvatarDefaultHeight}px;
`;

const StyledImage = styled(Image)`
  margin-top: -50px;
  object-fit: cover;
`;

const Name = styled.p`
  margin: 0 5px;
  font-size: 16px;
  font-family: "Nunito";
  font-weight: 900;
  color: rgb(48, 26, 107);
  text-transform: uppercase;
`;

export default Player;
