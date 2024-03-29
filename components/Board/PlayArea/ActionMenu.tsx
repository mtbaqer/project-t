import Modal from "@/components/Modal";
import Panel from "@/components/Panel";
import ConfirmationPopUp from "@/components/ConfirmationPopUp";
import React, { FunctionComponent, useState } from "react";
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
  const [popUpVisible, setPopUpVisible] = useState(false);

  if (status === "waiting") {
    return isNextHinter ? (
      <Button onClick={onStartTurn} text="START" color="blue" />
    ) : (
      <Div>WAITING FOR OTHER PLAYER TO START</Div>
    );
  }

  if (status === "paused") {
    return (
      <>
        <Modal onClose={onResume}>
          <Panel title="PAUSED" onClose={onResume}>
            <Container>
              {isInCurrentTeam && <Button onClick={onEndTurn} text="END TURN" color="blue" />}
              <Button onClick={() => setPopUpVisible(true)} text="END GAME" color="red" />
            </Container>
          </Panel>
        </Modal>
        {popUpVisible && (
          <Modal
            onClose={() => {
              setPopUpVisible(false);
            }}
          >
            <ConfirmationPopUp
              text={"Are you sure you want to end the game?"}
              onClickYes={onEndGame}
              onClickNo={() => setPopUpVisible(false)}
            />
          </Modal>
        )}
      </>
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
