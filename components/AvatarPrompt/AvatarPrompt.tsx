import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import useUserActions from "../../hooks/useUserActions";
import Button from "../Button";
import Heading from "../Heading";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import AvatarCustomization from "./AvatarCustomization";
import { Spaces } from "Theme/Spaces";

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
        <AvatarCustomization />
        <Input onChange={(e) => setUsername(e.target.value)} value={username} placeholder="CoolNickname" />
        <Button onClick={onStart} text="START" />
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
  gap: ${Spaces.medium};
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

  ::placeholder {
    color: white;
    opacity: 0.5;
  }

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
