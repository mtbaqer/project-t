import { roomAtom } from "atoms/room";
import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import useLobbyActions from "../../hooks/useLobbyActions";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import { Spaces } from "../../Theme/Spaces";
import Button from "../Button";
import Panel from "../Panel";
import Text from "../Text";

interface Props {}

const SettingsArea: FunctionComponent<Props> = ({}) => {
  const { onStartGame, onCopyLink, onSetNumberOfTeams, onSetNumberOfRounds, onSetTimePerRound } = useLobbyActions();
  const [isCopied, setIsCopied] = useState(false);
  const room = useAtomValue(roomAtom);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 10000);
    }
  }, [isCopied]);

  function handleCopyLink() {
    onCopyLink();
    setIsCopied(true);
  }

  return (
    <Container>
      <SubContainer>
        <Panel title="Settings" titleSize="l">
          <SettingsSubContainer>
            <SelectContainer>
              <Text size="s">Number of teams:</Text>
              <Select value={String(room.teams.length - 1)} onChange={(e) => onSetNumberOfTeams(e.target.value)}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Select>
            </SelectContainer>
            <SelectContainer>
              <Text size="s">Number of rounds:</Text>
              <Select value={String(room.settings.maxRounds)} onChange={(e) => onSetNumberOfRounds(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Select>
            </SelectContainer>
            <SelectContainer>
              <Text size="s">Time per round:</Text>
              <Select value={String(room.settings.timePerRound)} onChange={(e) => onSetTimePerRound(e.target.value)}>
                <option value="30">30 s</option>
                <option value="45">45 s</option>
                <option value="60">60 s</option>
                <option value="75">75 s</option>
              </Select>
            </SelectContainer>
          </SettingsSubContainer>
        </Panel>

        <ButtonContainer>
          <Button onClick={handleCopyLink} text={isCopied ? "LINK COPIED!" : "COPY LINK"} />
          <Button onClick={onStartGame} text="START" color="yellow" />
        </ButtonContainer>
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
  align-items: flex-end;
  flex: 1 0 0;
  padding-bottom: 10%;

  ${ScreenSizes.medium} {
    align-items: flex-end;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spaces.medium};
`;

const SettingsSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.small};
  align-items: center;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${Spaces.small};
`;

const Select = styled.select`
  border: 2px solid black;
  box-shadow: black 0 1px 0 0;
  border-radius: 5px;

  &:focus {
    outline: 2px solid #eec408; //TODO: use theme color
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${Spaces.small};
`;

export default SettingsArea;
