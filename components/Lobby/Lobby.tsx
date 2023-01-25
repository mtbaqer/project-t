import React, { FunctionComponent } from "react";
import SettingsArea from "./SettingsArea";
import Teams from "../Teams/Teams";
import HomeButton from "../Lobby/HomeButton";

interface Props {}

const Lobby: FunctionComponent<Props> = ({}) => {
  return (
    <>
      <SettingsArea />
      <HomeButton />
      <Teams lobby />
    </>
  );
};

export default Lobby;
