import React, { FunctionComponent } from "react";
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

const ActionMenu: FunctionComponent<Props> = ({ status, isNextHinter, isInCurrentTeam }) => {
  const { onStartTurn, onEndTurn, onEndGame } = useRoomActions();

  if (status === "waiting") {
    return isNextHinter ? (
      <Button onClick={onStartTurn} text="START" color="blue" />
    ) : (
      <Div>WAITING FOR OTHER PLAYER TO START</Div>
    );
  }

  if (status === "paused") {
    return (
      <PauseContainer>
        <Div>PAUSED</Div>
        {isInCurrentTeam && <Button onClick={onEndTurn} text="END TURN" />}
        <Button onClick={onEndGame} text="END GAME" />
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

export default ActionMenu;
