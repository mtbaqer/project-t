import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { roomAtom } from "../../../atoms/room";
import Text from "../../Text";

interface Props {}

const BackButton: FunctionComponent<Props> = ({}) => {
  const {
    round,
    settings: { maxRounds },
  } = useAtomValue(roomAtom);
  return (
    <Container>
      <Text size="l">
        {round}/{maxRounds}
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

export default BackButton;
