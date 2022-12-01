import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import useUserActions from "../hooks/useUserActions";
import Button from "./Button";
import Heading from "./Heading";
import { ScreenSizes } from "../Theme/ScreenSizes";

interface Props {}

const AvatarPrompt: FunctionComponent<Props> = ({}) => {
  const [username, setUsername] = useState("");
  const { addUser } = useUserActions();

  function onStart() {
    const randomAvatarIndex = 1 + Math.floor(Math.random() * 39);
    if (username.length) addUser(username, randomAvatarIndex.toString());
    else alert("Please input your username");
  }

  return (
    <Container>
      <SubContainer>
        <Heading styled={false}>CHOOSE A NICKNAME</Heading>
        <Input onChange={(e) => setUsername(e.target.value)} value={username} />
        <Button onClick={onStart} text="START" imageSource="/images/play.svg" />
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const Input = styled.input`
  border: 2px solid white;
  border-radius: 7px;
  width: 256px;
  height: 46px;
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.2);
  padding: 0 10px;
  color: rgb(255, 255, 255);
  font-size: 28px;
  font-weight: 700;

  &:focus {
    outline: none;
    background-color: transparent;
  }

  ${ScreenSizes.medium} {
    width: 256px;
    height: 35px;
    font-size: 16px;
    border-radius: 4px;
  }
`;

export default AvatarPrompt;
