import { FunctionComponent } from "react";
import TestArea from "./testArea";
import BackButton from "./BackButton";
import { roomAtom } from "../../atoms/room";
import { useAtomValue } from "jotai/utils";
import styled from "styled-components";

interface Props {}

const Results: FunctionComponent<Props> = ({}) => {
  const room = useAtomValue(roomAtom);
  const teams = room.teams;
  const spectators = teams[0];
  let activeTeams: { teamNumber: number; score: number }[] = [];
  teams.map((item, index) => {
    if (index > 0) {
      let team = { teamNumber: index, score: item.score };
      activeTeams.push(team);
    }
  });
  activeTeams.sort((a, b) => b.score - a.score);
  for (var i = 1; i < teams.length; i++) {}
  return (
    <>
      <BackButton />
      <Title>Congradulations!</Title>
      <Winner>
        {" "}
        Team {activeTeams[0].teamNumber} is the winner with {activeTeams[0].score} points!
      </Winner>
      <TeamsTable>
        <tbody>
          {activeTeams.map((team) => {
            return (
              <tr>
                {console.log(team)}
                {Object.values(team).map((value) => {
                  console.log("Here is the single value", value);
                  return <td>{`     ${value}      `}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </TeamsTable>
      {/* <TestArea /> */}
    </>
  );
};

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Nunito";
  font-weight: bold;
  font-size: 100px;
`;

const Winner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Nunito";
  font-weight: bold;
  font-size: 20px;
`;
const TeamsTable = styled.table`
  display: flex;
  font-family: "Nunito";
  font-weight: bold;
  font-size: 20px;
  border: 5px solid black;
`;

export default Results;
