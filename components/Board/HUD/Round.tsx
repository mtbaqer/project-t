import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../../../atoms/room";
import { ScreenSizes } from "../../../Theme/ScreenSizes";

interface Props {}

const BackButton: FunctionComponent<Props> = ({}) => {
  const {
    round,
    settings: { maxRounds },
  } = useAtomValue(roomAtom);
  return (
    <Container>
      <Strong>
        {round}/{maxRounds}
      </Strong>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: right;
  align-items: center;
`;

const Strong = styled.strong`
  font-size: 50px;
  font-weight: 800;
  color: white;
  font-family: "Nunito";
  font-weight: 900;

  ${ScreenSizes.medium} {
    font-size: 23px;
  }
`;

export default BackButton;
