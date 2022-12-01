import { selectAtom, useAtomValue } from "jotai/utils";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { roomAtom } from "../../atoms/room";
import Player from "./Player";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Sortable from "../utils/Sortable";
import { currentTeamIndexAtom, teamsAtom } from "../../atoms/teams";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import Heading from "../Heading";

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

  return (
    <SortableContext items={team.members ?? []} id={teamIndex.toString()}>
      <Container currentlyPlaying={currentlyPlaying} ref={setNodeRef} grid={grid}>
        <Heading>
          {title}
          {showScore && <Score leftAlign={teamIndex % 2 == 0}>{team?.score}</Score>}
        </Heading>
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
      ${ScreenSizes.medium} {
        width: 36vw;
        box-sizing: content-box;
      }
    `};
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
