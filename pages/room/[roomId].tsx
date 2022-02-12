import { useAtomValue } from "jotai/utils";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { roomAtom } from "../../atoms/room";
import Timer from "../../components/Timer";
import useRoom from "../../hooks/useRoom";
import useRoomActions from "../../hooks/useRoomActions";
import Team from "../../components/Team";
import Card from "../../components/Card";

const RoomPage: NextPage = () => {
  useRoom();
  const room = useAtomValue(roomAtom);
  const { onStartTurn, onPause, onResume, onCorrect, onTaboo } = useRoomActions();

  return (
    <Container>
      <Head>
        <title>{"Say Don't Say - Play with your Friends Online"}</title>
        <meta name="description" content="Say Don't Say - Play with your Friends Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {room.status !== "loading" && (
        <>
          <HUD>
            <Timer isPlaying={room.status == "playing"} onPause={onPause} onResume={onResume} />
          </HUD>
          <ContentContainer>
            <Team teamIndex={0} team={room.teams[0]} currentTeamIndex={room.currentTeamIndex} />
            <MainContainer>
              <Card onCorrect={onCorrect} onTaboo={onTaboo} onStartTurn={onStartTurn} />
            </MainContainer>
            <Team teamIndex={1} team={room.teams[1]} currentTeamIndex={room.currentTeamIndex} />
          </ContentContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-image: url("/images/textura.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;

const HUD = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

export default RoomPage;
