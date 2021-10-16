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
      {team?.members?.map((member) => (
        <Username>{member.name}</Username>
      ))}
    </Container>
  );
};

const Container = tw.div`
  justify-center
`;

const Username = styled.p`
  font-size: 32px;
`;

export default Team;
