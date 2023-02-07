import { useAtomValue } from "jotai/utils";
import React, { FunctionComponent, useState } from "react";
import styled, { css } from "styled-components";
import { roomAtom } from "../../../atoms/room";
import { userAtom } from "../../../atoms/user";
import CardArea from "./CardArea";
import { Team } from "../../../types/types";
import ActionArea from "./ActionArea";
import Feedback from "./Feedback";

import Div from "../../Div";
import useSound from "../../../hooks/useSound";
const SqueakpeaPath = "/sounds/Squeakpea.mp3";

interface Props {}

const PlayArea: FunctionComponent<Props> = ({}) => {
  const { timestamp } = useAtomValue(userAtom)!;
  const { play } = useSound(SqueakpeaPath);
  const room = useAtomValue(roomAtom);

  const status = room.status;
  const players = room.players;
  const currentTeam = room.teams[room.currentTeamIndex];

  const isHinter = checkIsHinter();
  const isInCurrentTeam = checkIsInCurrentTeam();
  const isNextHinter = checkIsNextHinter();

  const canSeeCard = !isInCurrentTeam || isHinter;

  const [currentTeamScore, changeCurrentTeamScore] = useState(currentTeam.score);
  if (currentTeam.score < currentTeamScore) {
    changeCurrentTeamScore(currentTeamScore - 1);
    play();
    console.log(`change: ${currentTeam.score} -> ${currentTeamScore}`);
  }

  function checkIsHinter() {
    const hinterIndex = currentTeam.currentMemberIndex;
    return checkIsPlayerAtIndex(currentTeam, hinterIndex);
  }

  function checkIsInCurrentTeam(): boolean {
    return currentTeam?.members?.includes(timestamp);
  }

  function checkIsNextHinter() {
    let nextTeamIndex = (room.currentTeamIndex + 1) % room.teams.length;
    nextTeamIndex = nextTeamIndex == 0 ? 1 : nextTeamIndex;
    const nextTeam = room.teams[nextTeamIndex];
    const nextHinterIndex = (nextTeam.currentMemberIndex + 1) % nextTeam.members.length;
    return checkIsPlayerAtIndex(nextTeam, nextHinterIndex);
  }

  function checkIsPlayerAtIndex(team: Team, index: number) {
    const playerTimestamp = team.members[index];
    return playerTimestamp === timestamp;
  }

  return (
    <Container>
      {status !== "playing" ? (
        <ActionArea status={status} isNextHinter={isNextHinter} isInCurrentTeam={isInCurrentTeam} />
      ) : (
        <>
          <Feedback />
          {canSeeCard && <CardArea isHinter={isHinter} />}
          {!canSeeCard && <Div text="You Are The Guesser" big />}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default PlayArea;
