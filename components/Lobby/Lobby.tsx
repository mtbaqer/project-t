import { FunctionComponent } from "react";
import SettingsArea from "./SettingsArea";
import Teams from "../Teams/Teams";
import Button from "../Button";
import useRoomActions from "hooks/useRoomActions";
import styled from "styled-components";
import useLobbyActions from "../../hooks/useLobbyActions";

interface Props {}

const Lobby: FunctionComponent<Props> = ({}) => {
  const { onReturnToGenerateRoom } = useRoomActions();
  const { onAddTeam } = useLobbyActions();
  return (
    <>
      {/* TODO: Figure out why button does not click */}
      {/* <ButtonContainer> */}
      {/* <Button text="RETURN TO GENERATE ROOM" onClick={clicked} imageSource="/images/chevron-left.svg" /> */}
      {/* <button onClick={clicked}>Hello</button> */}
      {/* </ButtonContainer> */}
      <SettingsArea />
      <Teams lobby />
    </>
  );
};
function clicked() {
  alert("hello");
}
const ButtonContainer = styled.div`
  flex: 1;
  padding-top: 30px;
`;

export default Lobby;
