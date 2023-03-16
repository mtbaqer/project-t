import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import useNewRoomActions from "../hooks/useNewRoomActions";
import Button from "../components/Button";
import HowToPlay from "../components/Home/HowToPlay";
import { Spaces } from "Theme/Spaces";
import About from "../components/Home/About";
import Footer from "@/components/Home/Footer";
import { Logo } from "constants/icons";

const Home: NextPage = () => {
  const { navigateToNewRoom } = useNewRoomActions();

  return (
    <>
      <Head>
        <title>{"Say Don't Say - Play with your Friends Online"}</title>
        <meta name="description" content="Say Don't Say - Play with your Friends Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Image priority {...Logo} alt="Say Don't Say Logo" />
        <Button onClick={navigateToNewRoom} text={"Create Room"} color="yellow" />
        <TextSection>
          <About />
          <HowToPlay />
        </TextSection>
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
  background-image: url("/images/textura.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  gap: ${Spaces.large};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${Spaces.large};
  min-height: 100vh;
  justify-content: space-between;
`;

const TextSection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export default Home;
