import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../../../atoms/room";

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
  padding-right: 20px;
  color: white;
  font-family: "Nunito";
  font-weight: 900;
`;

export default BackButton;
