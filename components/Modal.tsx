import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  onClose: () => void;
}

const Modal: FunctionComponent<Props> = ({ onClose, children }) => {
  return (
    <>
      <Backdrop onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </Backdrop>
    </>
  );
};

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

export default Modal;
