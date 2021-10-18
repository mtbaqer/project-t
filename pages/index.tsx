import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TeamComponent from "../components/Team";
import CardComponent from "../components/Card";
import useRoom from "../hooks/useRoom";
import Timer from "../components/Timer";

const Home: NextPage = () => {
  const { room, startTurn, onPause, onResume, createRoom } = useRoom();

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {room && (
        <>
          <HUD>
            <button onClick={createRoom}>Create room</button>
            <Timer
              turnEndTime={room.turnEndTime}
              isPlaying={room.status === "playing"}
              onPause={onPause}
              onResume={onResume}
            />
          </HUD>
          <ContentContainer>
            <TeamComponent team={room.teams[0]} />
            <MainContainer>
              <CardComponent
                card={room.deck?.[room.currentCardIndex]}
                status={room.status}
                onCorrect={() => {}}
                onTaboo={() => alert("bye")}
                onStartTurn={startTurn}
              />
            </MainContainer>
            <TeamComponent team={room.teams[1]} />
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

export default Home;
