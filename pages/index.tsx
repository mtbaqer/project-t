import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import useNewRoomActions from "../hooks/useNewRoomActions";

const Home: NextPage = () => {
  const { navigateToNewRoom } = useNewRoomActions();

  return (
    <Container>
      <Head>
        <title>{"Say Don't Say - Play with your Friends Online"}</title>
        <meta name="description" content="Say Don't Say - Play with your Friends Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={navigateToNewRoom}>
        <Image src="/images/play.svg" alt="play button" width={23} height={29} />
        <Strong>GENERATE ROOM</Strong>
      </Button>
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

const Button = styled.button`
  background-color: rgb(255, 255, 255);
  border-color: rgb(48, 26, 107);
  color: rgb(48, 26, 107);
  display: flex;
  align-items: center;
  border-radius: 7px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  width: 280px;
  height: 50px;
  padding: 0 10px;
  transform: scale(1.2);

  &:hover {
    background-color: rgb(203, 181, 233);
  }
  &:active {
    margin-bottom: -8px;
    box-shadow: rgb(48, 26, 107) 0px 2px 0px 0px;
  }
`;

const Strong = styled.strong`
  font-size: 19px;
  flex: 1;
  font-weight: 800;
`;

export default Home;
