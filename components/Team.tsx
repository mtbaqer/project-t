import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Team as TeamType } from "../types/types";

interface Props {
  team?: TeamType;
}

const Team: FunctionComponent<Props> = ({ team }) => {
  return (
    <Container>
      <Title>TEAM</Title>
      {team?.members?.map((member) => (
        <Username>{member.name}</Username>
      ))}
    </Container>
  );
};

const Container = styled.div`
  background-color: rgba(38, 28, 92, 0.5);
  display: flex;
  justify-content: center;
  border-radius: 10px;
  width: 200px;
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
