import { FunctionComponent } from "react";
import BackButton from "../../components/Board/HUD/BackButton";
import { roomAtom } from "../../atoms/room";
import { useAtomValue } from "jotai/utils";
import styled from "styled-components";
import Confetti from "react-confetti";
import useWindowSize from "@rooks/use-window-size";
import { ScreenSizes } from "../../Theme/ScreenSizes";
import useRoomActions from "hooks/useRoomActions";

interface Props {}

const Results: FunctionComponent<Props> = ({}) => {
  const room = useAtomValue(roomAtom);
  const { onBackButton } = useRoomActions();
  const teams = room.teams;

  const { innerWidth, innerHeight } = useWindowSize();

  const activeTeams = teams
    .filter((_item, index) => index !== 0)
    .map((item, index) => ({ teamNumber: index + 1, score: item.score }));

  activeTeams.sort((a, b) => b.score - a.score);
  return (
    <>
      <Confetti width={innerWidth ?? 0} height={innerHeight ?? 0} />

      <ButtonContainer>
        <BackButton onClick={onBackButton} />
      </ButtonContainer>

      <Title>Congratulations!</Title>
      <Winner>
        Team {activeTeams[0].teamNumber} is the winner with {activeTeams[0].score} points!
      </Winner>
      <TeamsTable>
        <tbody>
          {activeTeams.map(
            (team, index) =>
              index > 0 && (
                <tr>
                  <TableDataCell>{`Team ${team.teamNumber} `}</TableDataCell>
                  <TableDataCell>{`${team.score} points`} </TableDataCell>
                </tr>
              )
          )}
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
  font-weight: bold;
  font-size: 10vw;
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

  ${ScreenSizes.medium} {
    font-size: 18px;
  }
`;
const TeamsTable = styled.table`
  margin-left: 100px;
  margin-right: 100px;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;

  ${ScreenSizes.medium} {
    font-size: 14px;
  }
`;
const TableDataCell = styled.td`
  border: 5px solid cornflowerblue;
  text-align: center;
`;

export default Results;
