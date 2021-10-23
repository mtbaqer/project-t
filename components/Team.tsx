import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { Team as TeamType } from "../types/types";

interface Props {
  team?: TeamType;
  teamIndex?: number;
  currentTeamIndex?: number;
}

const Team: FunctionComponent<Props> = ({ team, teamIndex, currentTeamIndex }) => {
  return (
    <Container currentlyPlaying={teamIndex === currentTeamIndex}>
      <Title>TEAM</Title>
      {team?.members && Object.values(team?.members).map((member) => <Username>{member.name}</Username>)}
    </Container>
  );
};

const Container = styled.div<{ currentlyPlaying: boolean }>`
  background-color: rgba(38, 28, 92, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  width: 200px;

  ${({ currentlyPlaying }) =>
    currentlyPlaying
      ? css`
          border: 1px solid yellow;
        `
      : ""}
`;

const Title = styled.h3`
  color: rgb(92, 255, 182);
  font-size: 22px;
  font-weight: bold;
  outline-color: black;
`;

const Username = styled.p`
  font-size: 32px;
`;

export default Team;
