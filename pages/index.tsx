import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import useNewRoomActions from "../hooks/useNewRoomActions";
import Button from "../components/Button";

const Home: NextPage = () => {
  const { navigateToNewRoom } = useNewRoomActions();

  return (
    <Container>
      <Head>
        <title>{"Say Don't Say - Play with your Friends Online"}</title>
        <meta name="description" content="Say Don't Say - Play with your Friends Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={navigateToNewRoom} text={"Generate Room"} imageSource="/images/play.svg" />
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
  justify-content: center;
  align-items: center;
`;

export default Home;
