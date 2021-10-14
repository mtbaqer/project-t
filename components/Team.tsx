import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Team as TeamType } from "../types/types";

interface Props {
  team: TeamType;
}

const Team: FunctionComponent<Props> = ({ team }) => {
  return (
    <TeamContainer>
      {team.members.map((member) => (
        <Username>{member.name}</Username>
      ))}
    </TeamContainer>
  );
};

const TeamContainer = styled.div`
  background-color: blue;
`;

const Username = styled.p`
  font-size: 32px;
`;

export default Team;
