import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>{"Say Don't Say - Play with your Friends Online"}</title>
        <meta name="description" content="Say Don't Say - Play with your Friends Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <P>Hello</P>
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

const P = styled.p``;

export default Home;
