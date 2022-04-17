import { useAtomValue } from "jotai/utils";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { roomAtom } from "../../atoms/room";
import useRoom from "../../hooks/useRoom";
import { authAtom, userAtom } from "../../atoms/user";
import Board from "../../components/Board/Board";
import UserPrompt from "../../components/UserPrompt";
import { useHotkeys } from "react-hotkeys-hook";
import useSound from "../../hooks/useSound";
import Lobby from "../../components/Lobby/Lobby";

const SqueakpeaPath = "/sounds/Squeakpea.mp3";

const RoomPage: NextPage = () => {
  useRoom();
  const room = useAtomValue(roomAtom);
  const user = useAtomValue(userAtom);

  const { play } = useSound(SqueakpeaPath);
  useHotkeys("Space", play);

  return (
    <Container>
      <Head>
        <title>{"Say Don't Say - Play with your Friends Online"}</title>
        <meta name="description" content="Say Don't Say - Play with your Friends Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!user ? <UserPrompt /> : room.status === "lobby" ? <Lobby /> : <Board />}
    </Container>
  );
};

const Container = styled.div`
  background-image: url("/images/textura.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default RoomPage;
