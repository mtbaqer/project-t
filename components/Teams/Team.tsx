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
import Text from "../Text";
import { Spaces } from "Theme/Spaces";

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
        <HeadingContainer>
          <Text>
            {title}
            {showScore && <Score leftAlign={teamIndex % 2 == 0}>{team?.score}</Score>}
          </Text>
        </HeadingContainer>
        <Content>
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
        </Content>
      </Container>
    </SortableContext>
  );
};

const Container = styled.div<{ currentlyPlaying: boolean; grid: boolean }>`
  background-color: #23aff4;
  border: 3px solid black;
  border-radius: 5px;
  box-shadow: 0 3px 0 0 black, 0 5px 0 0 rgba(0, 0, 0, 0.25);
  transform: skewX(-5deg);
  padding-bottom: ${Spaces.small};

  ${({ grid }) =>
    !grid &&
    css`
      width: 390px;

      ${ScreenSizes.medium} {
        width: 40vw;
        box-sizing: content-box;
      }
    `};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transform: skewX(5deg);
`;

const HeadingContainer = styled.div`
  background-color: #2f85fd;

  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
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
  justify-content: center;
  align-items: center;
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
