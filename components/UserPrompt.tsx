import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import useUserActions from "../hooks/useUserActions";

interface Props {}

const UserPrompt: FunctionComponent<Props> = ({}) => {
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
        <H4>CHOOSE A NICKNAME</H4>
        <Input onChange={(e) => setUsername(e.target.value)} value={username} />
        <Button onClick={onStart}>
          <Image src="/images/play.svg" alt="play button" width={23} height={29} />
          <Strong>START</Strong>
        </Button>
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
`;

const H4 = styled.h4`
  color: rgb(255, 255, 255);
  margin-bottom: 25px;
  font-family: "Nunito";
  font-weight: 900;
  font-size: 23px;
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
  font-family: "Nunito";
  font-weight: 700;
  margin-bottom: 60px;

  &:focus {
    outline: none;
    background-color: transparent;
  }
`;

const Button = styled.button`
  background-color: rgb(255, 255, 255);
  border-color: rgb(48, 26, 107);
  color: rgb(48, 26, 107);
  display: flex;
  align-items: center;
  border-radius: 7px;
  box-shadow: rgb(48, 26, 107) 0px 6px 0px 0px;
  width: 220px;
  height: 50px;
  padding: 0 10px;
  transform: scale(1.2);

  &:hover {
    background-color: rgb(203, 181, 233);
  }
  &:active {
    margin-top: 8px;
    margin-bottom: -8px;
    box-shadow: rgb(48, 26, 107) 0px 2px 0px 0px;
  }
`;

const Strong = styled.strong`
  font-size: 19px;
  flex: 1;
  font-family: "Nunito";
  font-weight: 900;
`;

export default UserPrompt;
