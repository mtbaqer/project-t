import { FunctionComponent } from "react";
import BackButton from "../../components/Board/HUD/BackButton";
import { roomAtom } from "../../atoms/room";
import { useAtomValue } from "jotai/utils";
import styled from "styled-components";
import Confetti from "react-confetti";

interface Props {}

const Results: FunctionComponent<Props> = ({}) => {
  const room = useAtomValue(roomAtom);
  const teams = room.teams;
  const activeTeams = teams
    .filter((_item, index) => index !== 0)
    .map((item, index) => ({ teamNumber: index + 1, score: item.score }));

  activeTeams.sort((a, b) => b.score - a.score);
  return (
    <>
      <Confetti />
      <ButtonContainer>
        <BackButton />
      </ButtonContainer>

      <Title>Congratulations!</Title>
      <Winner>
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
    </>
  );
};
const ButtonContainer = styled.div`
  padding-left: 30px;
`;

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
  font-size: 30px;
  margin-bottom: 20px;
`;
const TeamsTable = styled.table`
  margin-left: 100px;
  margin-right: 100px;
  justify-content: center;
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
