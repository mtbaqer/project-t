import { FunctionComponent } from "react";
import SettingsArea from "./SettingsArea";
import Teams from "./Teams";

interface Props {}

const Lobby: FunctionComponent<Props> = ({}) => {
  return (
    <>
      <SettingsArea />
      <Teams lobby />
    </>
  );
};

export default Lobby;
