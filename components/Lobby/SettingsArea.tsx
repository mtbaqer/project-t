import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import useLobbyActions from "../../hooks/useLobbyActions";
import { useState } from "react";

interface Props {}

const SettingsArea: FunctionComponent<Props> = ({}) => {
  const { onAddTeam, onRemoveTeam, onStartGame, onCopyLink } = useLobbyActions();
  const [isCopied, setIsCopied] = useState(false);
  return (
    <CenterContainer>
      <CenterSubContainer>
        <ButtonContainer>
          <Button onClick={onAddTeam}>
            <Image src="/images/correct.svg" alt="play button" width={23} height={29} />
            <Strong>ADD TEAM</Strong>
          </Button>
          <Button onClick={onRemoveTeam}>
            <Image src="/images/correct.svg" alt="play button" width={23} height={29} />
            <Strong>REMOVE TEAM</Strong>
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            onClick={() => {
              onCopyLink(setIsCopied);
            }}
          >
            <Image src="/images/copy_link.svg" alt="play button" width={29} height={30} />
            {isCopied ? <Strong>LINK COPIED</Strong> : <Strong>COPY LINK</Strong>}
          </Button>
          <Button onClick={onStartGame}>
            <Image src="/images/play.svg" alt="play button" width={23} height={29} />
            <Strong>START GAME</Strong>
          </Button>
        </ButtonContainer>
      </CenterSubContainer>
    </CenterContainer>
  );
};

const CenterContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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
  margin: 13px 50px 0px 50px;
  bottom: 20px;

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

export default SettingsArea;
