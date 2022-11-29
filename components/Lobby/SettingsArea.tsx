import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import useLobbyActions from "../../hooks/useLobbyActions";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import Button from "../Button";

interface Props {}

const SettingsArea: FunctionComponent<Props> = ({}) => {
  const { onAddTeam, onRemoveTeam, onStartGame } = useLobbyActions();
  return (
    <Container>
      <SubContainer>
        <ButtonContainer>
          <Button onClick={onAddTeam} text="ADD TEAM" imageSource="/images/correct.svg" />
          <Button onClick={onAddTeam} text="REMOVE TEAM" imageSource="/images/wrong.svg" />
        </ButtonContainer>
        <Button onClick={onAddTeam} text="START GAME" imageSource="/images/play.svg" />
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${ScreenSizes.medium} {
    align-items: flex-end;
    padding: 10%;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  ${ScreenSizes.medium} {
    /* gap: 32px; */
  }
`;

export default SettingsArea;
