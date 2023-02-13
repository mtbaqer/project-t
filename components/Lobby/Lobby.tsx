import React, { FunctionComponent, useState } from "react";
import SettingsArea from "./SettingsArea";
import Teams from "../Teams/Teams";
import HomeButton from "../Lobby/HomeButton";
import PopUp from "../PopUp";
import useRoomActions from "hooks/useRoomActions";

interface Props {}

const Lobby: FunctionComponent<Props> = ({}) => {
  const [clicked, setClicked] = useState(false);
  const { onReturnToGenerateRoom } = useRoomActions();

  return (
    <>
      <SettingsArea />
      <HomeButton
        onClick={() => {
          setClicked(true);
        }}
      />
      <Teams lobby />
      {clicked && (
        <PopUp
          text={"Are you sure you want to exit this room?"}
          onClickYes={onReturnToGenerateRoom}
          onClickNo={() => setClicked(false)}
        />
      )}
      ;
    </>
  );
};

export default Lobby;
