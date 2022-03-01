import { selectAtom, useAtomValue } from "jotai/utils";
import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { roomAtom } from "../atoms/room";
import Player from "./Player";
import { Droppable } from "react-beautiful-dnd";

const teamsAtom = selectAtom(roomAtom, (room) => room.teams);
const currentTeamIndexAtom = selectAtom(roomAtom, (room) => room.currentTeamIndex);

interface Props {
  teamIndex?: number;
  showScore?: boolean;
}

const Team: FunctionComponent<Props> = ({ teamIndex = 0, showScore = true }) => {
  const teams = useAtomValue(teamsAtom);
  const currentTeamIndex = useAtomValue(currentTeamIndexAtom);

  const team = teams[teamIndex];
  const currentlyPlaying = currentTeamIndex === teamIndex;

  return (
    <Container>
      <SubContainer currentlyPlaying={currentlyPlaying}>
        <Title>
          TEAM {teamIndex + 1}
          {showScore && <Score leftAlign={teamIndex % 2 == 1}>{team?.score}</Score>}
        </Title>
        <Droppable droppableId={teamIndex.toString()}>
          {(provided, snapshot) => (
            <Members ref={provided.innerRef} {...provided.droppableProps}>
              {team?.members &&
                Object.entries(team?.members).map(([timestamp, member], index) => (
                  <Player
                    index={index}
                    key={member.id}
                    timestamp={timestamp}
                    user={member}
                    isHinter={currentlyPlaying && member.id === team?.members?.[team.currentUserTimestamp]?.id}
                  />
                ))}
              {provided.placeholder}
            </Members>
          )}
        </Droppable>
      </SubContainer>
    </Container>
  );
};

const Container = styled.div``;

const SubContainer = styled.div<{ currentlyPlaying: boolean }>`
  background-color: rgba(38, 28, 92, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 356px;
  margin: 10px 18px;
  padding: 13px 0;
  position: relative;

  ${({ currentlyPlaying }) =>
    currentlyPlaying
      ? css`
          border: 4px solid rgb(67 216 162);
        `
      : ""};
`;

const Title = styled.h3`
  color: rgb(92, 255, 182);
  font-size: 22px;
  font-family: "Nunito";
  font-weight: 900;
  outline-color: black;
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

const Members = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

export default Team;
