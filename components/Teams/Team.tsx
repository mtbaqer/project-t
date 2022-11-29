import { selectAtom, useAtomValue } from "jotai/utils";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { roomAtom } from "../../atoms/room";
import Player from "./Player";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Sortable from "../utils/Sortable";
import { currentTeamIndexAtom, teamsAtom } from "../../atoms/teams";
import { useResponsive } from "react-hooks-responsive";
import { Breakpoints, ScreenSizes } from "../../Theme/ScreenSizes";

interface Props {
  teamIndex?: number;
  showScore?: boolean;
  title?: string;
  grid?: boolean;
}

const Team: FunctionComponent<Props> = ({ teamIndex = 0, showScore = false, title, grid = false }) => {
  const teams = useAtomValue(teamsAtom);
  const currentTeamIndex = useAtomValue(currentTeamIndexAtom);

  const team = teams[teamIndex];
  const currentlyPlaying = currentTeamIndex === teamIndex;

  const { setNodeRef } = useDroppable({ id: teamIndex.toString() });

  const { screenIsAtMost } = useResponsive(Breakpoints);

  return (
    <SortableContext items={team.members ?? []} id={teamIndex.toString()}>
      <Container currentlyPlaying={currentlyPlaying} ref={setNodeRef} grid={grid}>
        <Title>
          {title}
          {showScore && <Score leftAlign={teamIndex % 2 == 0}>{team?.score}</Score>}
        </Title>
        <Members grid={grid}>
          {team?.members &&
            team.members.map((timestamp, index) => (
              <Sortable key={timestamp} id={timestamp}>
                <Player
                  key={timestamp}
                  timestamp={timestamp}
                  isHinter={currentlyPlaying && index === team.currentMemberIndex}
                />
              </Sortable>
            ))}
        </Members>
      </Container>
    </SortableContext>
  );
};

const Container = styled.div<{ currentlyPlaying: boolean; grid: boolean }>`
  background-color: rgba(38, 28, 92, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 13px 10px;
  position: relative;

  ${({ currentlyPlaying }) =>
    currentlyPlaying
      ? css`
          border: 4px solid rgb(67 216 162);
          padding: 9px 6px;
        `
      : ""};

  ${({ grid }) =>
    !grid &&
    css`
      width: 356px;
    `};

  ${ScreenSizes.medium} {
    width: 100%;
  }
`;

const Title = styled.h3`
  color: rgb(92, 255, 182);
  font-size: 22px;
  font-family: "Nunito";
  font-weight: 900;
  outline-color: black;
  text-transform: uppercase;
  text-shadow: rgb(23, 5, 87) 3px 0px 0px, rgb(23, 5, 87) 2.83487px 0.981584px 0px,
    rgb(23, 5, 87) 2.35766px 1.85511px 0px, rgb(23, 5, 87) 1.62091px 2.52441px 0px,
    rgb(23, 5, 87) 0.705713px 2.91581px 0px, rgb(23, 5, 87) -0.287171px 2.98622px 0px,
    rgb(23, 5, 87) -1.24844px 2.72789px 0px, rgb(23, 5, 87) -2.07227px 2.16926px 0px,
    rgb(23, 5, 87) -2.66798px 1.37182px 0px, rgb(23, 5, 87) -2.96998px 0.42336px 0px,
    rgb(23, 5, 87) -2.94502px -0.571704px 0px, rgb(23, 5, 87) -2.59586px -1.50383px 0px,
    rgb(23, 5, 87) -1.96093px -2.27041px 0px, rgb(23, 5, 87) -1.11013px -2.78704px 0px,
    rgb(23, 5, 87) -0.137119px -2.99686px 0px, rgb(23, 5, 87) 0.850987px -2.87677px 0px,
    rgb(23, 5, 87) 1.74541px -2.43999px 0px, rgb(23, 5, 87) 2.44769px -1.73459px 0px,
    rgb(23, 5, 87) 2.88051px -0.838247px 0px;
`;

const Score = styled.span<{ leftAlign: boolean }>`
  position: absolute;
  ${({ leftAlign }) =>
    leftAlign
      ? css`
          left: 20px;
        `
      : css`
          right: 20px;
        `}
`;

const Members = styled.ul<{ grid: boolean }>`
  margin-top: 15px;
  display: flex;
  width: 100%;

  ${({ grid }) =>
    grid
      ? css`
          flex-direction: row;
          justify-content: center;
          flex-wrap: wrap;
        `
      : css`
          flex-direction: column;
          justify-content: center;
        `}
`;

export default Team;

// Team:
// displayOrder: [timestamp0,timestamp1,timestamp2]
// currentTimestamp:
// currentIndex:

// room:
// players:{100:user0, 220:user2}

// Team:
// displayOrder: [timestamp0,timestamp2]

// [timestamp0,timestamp1,timestamp2]

// DragDrop:
// displayOrder: [timestamp2, timestamp0]

// [timestamp0,timestamp3]

// [timestamp3,timestamp0]

// runTransaction((team)=>{
//   [,timestamp0,,timestamp3]
//   return team;
// })

// user 1 leaves
// ondisconnect -> remove room.players
// user 1 is stale
// room.players = [0,2,3]
// teams.members=[0,1,2,3]
// teams.index++

// while(!room.players.contains(teams[index])) index++ % length

// [0,1,2,3,4]: 1,2,3 stale, new array [0,4] idx=0,1

// [0,1,2]: idx=1, 1 disconnects, new array [0,2] idx = 1 (atom has to change index)

// [0,1,2,3,4] idx = 2, 2 disconnects, new array [0,1,3,4], idx = 2

// staleIndex < index: index - 1
// staleIndex >= index: do nothing

// while(!room.players.contains(teams[index])) index++ % length

// [a,b,c,d] before last player 3

// [d,a,b,c]

// [0,1,2,3,4]
// index:
// [tm,tm,tm]

// teams.memebrs
// pastPlayer:timestamp
// // currentPlayer:timestamp

// [0,1,2,3,4] index:2
// skip:2
// [0,1,4] index: 4-1=3

// players=[1,3]
// team 1
// [1,2,3]       1,2,3->1,3            [1,3]
//               decrement idx--
//             indicesToSkip: 1,2

// firebase -> atom (filtering) -> client state

// [0,1,2,3]
// index: 3+1

// [0,2,3,4,5]
// index: 3+1

// [timestamp0,timestamp1,timestamp2,timestmap4,timestamp3]

// "conversion"/stale things to account for: displayOrder for all teams & players in room
// spectators as team 0

// ondisconnect: good
// player joining lobby: good
// player dragging from Spectators to team1:good
// player joining midgame:good
// player dragging from team 1 to team2:good
// player dragging to a different position in the same team:good
// turn order:
// player leaves in the middle of turn:
// player leaves before current turn:
// player leaves without joining again:
// player leaves then join:

// 2 players dragging to the same team:
// 1 player dragging out of team and another player dragging into team:
