import { useAtomValue } from "jotai/utils";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { roomAtom } from "../../atoms/room";
import useRoom from "../../hooks/useRoom";
import { authAtom, userAtom } from "../../atoms/user";
import Board from "../../components/Board/Board";
import { useHotkeys } from "react-hotkeys-hook";
import useSound from "../../hooks/useSound";
import Lobby from "../../components/Lobby/Lobby";
import AvatarPrompt from "../../components/AvatarPrompt";
import Results from "../../components/Results/Results";

const SqueakpeaPath = "/sounds/Squeakpea.mp3";

const RoomPage: NextPage = () => {
  useRoom();
  const room = useAtomValue(roomAtom);
  const user = useAtomValue(userAtom);
  const auth = useAtomValue(authAtom);

  const { play } = useSound(SqueakpeaPath);
  useHotkeys("Space", play);

  function renderContent() {
    console.log(`Auth ${auth} - User: ${user}`);

    if (!auth || room.status === "loading") return null;
    if (!user) {
      if (room.playersHistory?.[auth.id]) return null;
      return <AvatarPrompt />;
    }
    if (room.status === "lobby") return <Lobby />;
    if (room.status === "ended") return <Results />;
    return <Board />;
  }

  return (
    <Container>
      <Head>
        <title>{"Say Don't Say - Play with your Friends Online"}</title>
        <meta name="description" content="Say Don't Say - Play with your Friends Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {renderContent()}
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
  position: relative;
`;

export default RoomPage;
