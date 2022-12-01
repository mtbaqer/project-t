import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { teamsAtom } from "../../atoms/teams";
import Player from "./Player";
import Team from "./Team";

interface Props {
  lobby: boolean;
}

const Spectators: FunctionComponent<Props> = ({ lobby }) => {
  const teams = useAtomValue(teamsAtom);
  const spectators = teams[0].members;

  const cutoff = Math.ceil(spectators.length / 2);
  const leftSide = spectators.slice(0, cutoff);
  const rightSide = spectators.slice(cutoff);

  return lobby ? (
    <Container>
      <Team title={`Spectators`} teamIndex={0} showScore={false} grid />
    </Container>
  ) : (
    <>
      <SubContainer left={true}>
        {leftSide.map((timestamp) => (
          <Player key={timestamp} timestamp={timestamp} mini />
        ))}
      </SubContainer>
      <Padding />
      <SubContainer left={false}>
        {rightSide.map((timestamp) => (
          <Player key={timestamp} timestamp={timestamp} mini />
        ))}
      </SubContainer>
    </>
  );
};

const Container = styled.div`
  width: 70%;
`;

const SubContainer = styled.div<{ left: boolean }>`
  display: flex;
  align-items: center;

  justify-content: ${({ left }) => (left ? "flex-end" : "flex-start")};
`;

const Padding = styled.div`
  width: 200px;
`;

export default Spectators;
