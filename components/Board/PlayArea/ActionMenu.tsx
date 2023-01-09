import Panel from "@/components/Panel";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Spaces } from "Theme/Spaces";
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
  const { onStartTurn, onResume, onEndTurn, onEndGame } = useRoomActions();

  if (status === "waiting") {
    return isNextHinter ? (
      <Button onClick={onStartTurn} text="START" color="blue" />
    ) : (
      <Div>WAITING FOR OTHER PLAYER TO START</Div>
    );
  }

  if (status === "paused") {
    return (
      <Panel title="PAUSED" onClose={onResume}>
        <Container>
          {isInCurrentTeam && <Button onClick={onEndTurn} text="END TURN" color="blue" />}
          <Button onClick={onEndGame} text="END GAME" color="red" />
        </Container>
      </Panel>
    );
  }

  return null;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spaces.medium};
`;

export default ActionMenu;
