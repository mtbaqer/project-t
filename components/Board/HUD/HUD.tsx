import ConfirmationPopUp from "@/components/ConfirmationPopUp";
import Modal from "@/components/Modal";
import useRoomActions from "hooks/useRoomActions";
import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import BackButton from "./BackButton";
import Round from "./Round";
import Timer from "./Timer";

interface Props {}

const HUD: FunctionComponent<Props> = ({}) => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const { onBackButton } = useRoomActions();

  return (
    <>
      <Container>
        <BackButton onClick={() => setPopUpVisible(true)} />
        <Timer />
        <Round />
      </Container>
      {popUpVisible && (
        <Modal
          onClose={() => {
            setPopUpVisible(false);
          }}
        >
          <ConfirmationPopUp
            text={"Are you sure you want to return to the lobby?"}
            onClickYes={onBackButton}
            onClickNo={() => setPopUpVisible(false)}
          />
        </Modal>
      )}
    </>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 10;
  padding: 0 30px;
`;

export default HUD;
