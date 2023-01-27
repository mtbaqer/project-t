import { FunctionComponent } from "react";
import BackButton from "../../components/Board/HUD/BackButton";
import { roomAtom } from "../../atoms/room";
import { useAtomValue } from "jotai/utils";
import styled from "styled-components";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import Button from "../Button";
import Heading from "../Heading";

interface Props {}

const Settings: FunctionComponent<Props> = ({}) => {
  const room = useAtomValue(roomAtom);
  const teams = room.teams;
  //   let size = 0;
  let size = 0;
  let teamSizeIsValid = false;

  return (
    <>
      <ButtonContainer>
        <BackButton />
      </ButtonContainer>

      <Title>Settings</Title>
      <Container>
        <SubContainer>
          <Heading styled={false}>CHOOSE TEAM SIZE</Heading>
          <Input onChange={(e) => (size = teamSizeValue(e.target.value))} />
          {/* <Heading styled={false}>CHOOSE MAX ROUND</Heading>
          <Input />
          <Heading styled={false}>CHOOSE TIME PER ROUND</Heading>
          <Input /> */}
          <Button onClick={saveSettingsData} text="SAVE" />
        </SubContainer>
      </Container>
    </>
  );
};
function teamSizeValue(size: any) {
  let sizeAsInt = parseInt(size);
  if (sizeAsInt >= 2 && sizeAsInt <= 6) {
    return sizeAsInt;
  }
  return NaN;
}
function saveSettingsData() {
  //   let size = document.getElementById("teamSize").targ;
  //   console.log(size);
}
const ButtonContainer = styled.div`
  padding-left: 30px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 10vw;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const Input = styled.input`
  border: 2px solid white;
  border-radius: 7px;
  width: 256px;
  height: 46px;
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.2);
  padding: 0 10px;
  color: rgb(255, 255, 255);
  font-size: 28px;
  font-weight: 700;

  &:focus {
    outline: none;
    background-color: transparent;
  }

  ${ScreenSizes.medium} {
    width: 256px;
    height: 35px;
    font-size: 16px;
    border-radius: 4px;
  }
`;

export default Settings;
