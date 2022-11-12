import { FunctionComponent } from "react";
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
      const team = { teamNumber: index, score: item.score };
      activeTeams.push(team);
    }
  });

  activeTeams.sort((a, b) => b.score - a.score);
  return (
    <>
      <BackButton />
      <Title>Congratulations!</Title>
      <Winner>
        {" "}
        Team {activeTeams[0].teamNumber} is the winner with {activeTeams[0].score} points!
      </Winner>
      <TeamsTable>
        <tbody>
          {activeTeams.map((team, index) => {
            if (index > 0) {
              return (
                <tr>
                  <TableDataCell>{`Team ${team.teamNumber} `}</TableDataCell>
                  <TableDataCell>{`${team.score} points`} </TableDataCell>
                </tr>
              );
            } else {
              return;
            }
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
  font-family: "Nunito";
  font-weight: bold;
  font-size: 20px;
`;
const TableDataCell = styled.td`
  font-family: "Nunito";
  font-weight: bold;
  font-size: 20px;
  border: 5px solid cornflowerblue;
  text-align: center;
`;

export default Results;
