import React, { FunctionComponent } from "react";
import styled from "styled-components";
import useLobbyActions from "../../hooks/useLobbyActions";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import { Spaces } from "../../Theme/Spaces";
import Button from "../Button";

interface Props {}

const SettingsArea: FunctionComponent<Props> = ({}) => {
  const { onAddTeam, onRemoveTeam, onStartGame } = useLobbyActions();
  return (
    <Container>
      <SubContainer>
        <ButtonContainer>
          <Button onClick={onAddTeam} text="ADD TEAM" imageSource="/images/correct.svg" />
          <Button onClick={onRemoveTeam} text="REMOVE TEAM" imageSource="/images/wrong.svg" />
        </ButtonContainer>
        <Button onClick={onStartGame} text="START" imageSource="/images/play.svg" />
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
  flex: 1 0 0;

  ${ScreenSizes.medium} {
    align-items: flex-end;
    padding-bottom: 10%;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spaces.medium};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${Spaces.small};
`;

export default SettingsArea;
