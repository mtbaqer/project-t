import PopUp from "@/components/PopUp";
import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import useRoomActions from "../../../hooks/useRoomActions";
import { RoomStatus } from "../../../types/types";
import Button from "../../Button";
import Div from "../../Div";

interface Props {
  status: RoomStatus;
  isNextHinter: boolean;
  isInCurrentTeam: boolean;
}

const ActionArea: FunctionComponent<Props> = ({ status, isNextHinter, isInCurrentTeam }) => {
  const { onStartTurn, onEndTurn, onEndGame } = useRoomActions();
  const [endGameClicked, setEndGameClicked] = useState(false);

  if (status === "waiting") {
    return isNextHinter ? (
      <Button onClick={onStartTurn} imageSource="/images/play.svg" text="START" />
    ) : (
      <Div>WAITING FOR OTHER PLAYER TO START</Div>
    );
  }

  if (status === "paused") {
    return (
      <PauseContainer>
        <Div>PAUSED</Div>
        {isInCurrentTeam && <Button onClick={onEndTurn} text="END TURN" />}
        <Button
          onClick={() => {
            setEndGameClicked(true);
          }}
          text="END GAME"
        />
        {endGameClicked && (
          <PopUp
            onClickYes={onEndGame}
            onClickNo={() => {
              setEndGameClicked(false);
            }}
            text="Are you sure you want to end the game?"
          />
        )}
      </PauseContainer>
    );
  }

  return null;
};

const PauseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default ActionArea;
