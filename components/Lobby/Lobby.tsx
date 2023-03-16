import React, { FunctionComponent, useState } from "react";
import SettingsArea from "./SettingsArea";
import Teams from "../Teams/Teams";
import HomeButton from "../Lobby/HomeButton";
import ConfirmationPopUp from "../ConfirmationPopUp";
import useRoomActions from "hooks/useRoomActions";
import Modal from "../Modal";
import useResponsive from "hooks/useResponsive";

interface Props {}

const Lobby: FunctionComponent<Props> = ({}) => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const { onReturnToGenerateRoom } = useRoomActions();
  const { isDesktopOrLaptop } = useResponsive();

  return (
    <>
      <SettingsArea />
      {isDesktopOrLaptop && <HomeButton onClick={() => setPopUpVisible(true)} />}
      <Teams lobby />
      {popUpVisible && (
        <Modal
          onClose={() => {
            setPopUpVisible(false);
          }}
        >
          <ConfirmationPopUp
            text={"Are you sure you want to exit this room?"}
            onClickYes={onReturnToGenerateRoom}
            onClickNo={() => setPopUpVisible(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default Lobby;
