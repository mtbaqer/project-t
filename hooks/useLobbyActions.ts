import { child, getDatabase, increment, ref, runTransaction, update } from "firebase/database";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { roomAtom } from "../atoms/room";
import { Room, RoomStatus, Team } from "../types/types";
import cleanupDisconnectedPlayers from "../utils/cleanupDisconnectedPlayers";

const database = getDatabase();

export default function useLobbyActions() {
  const room = useAtomValue(roomAtom);

  const router = useRouter();
  const { roomId } = router.query;

  const roomRef = ref(database, `rooms/${roomId}`);
  const teamsRef = child(roomRef, "teams");

  function onNextCard(scoreIncrement: number) {
    const teamRef = child(teamsRef, room!.currentTeamIndex.toString());
    update(teamRef, { score: increment(scoreIncrement) });
    update(roomRef, { currentCardIndex: increment(1) });
  }

  function onPlayerChooseTeam(memberTimestamp: string, destinationTeamIndex: number, destinationPlayerIndex: number) {
    runTransaction(roomRef, (room: Room) => {
      const sourceTeam = room.teams.find((team) => team.members?.includes(memberTimestamp))!;
      sourceTeam.members = sourceTeam.members.filter((timestamp) => timestamp !== memberTimestamp);

      const destinationTeam = room.teams[destinationTeamIndex];
      destinationTeam.members = destinationTeam.members ?? [];
      cleanupDisconnectedPlayers(destinationTeam, Object.keys(room.players));
      destinationTeam.members.splice(destinationPlayerIndex, 0, memberTimestamp);

      return room;
    });
  }

  function onAddTeam() {
    runTransaction(teamsRef, (teams: Team[]) => {
      if (teams.length < 7) teams.push({ members: [], score: 0, currentMemberIndex: 0 });
      return teams;
    });
  }

  function onRemoveTeam() {
    runTransaction(teamsRef, (teams: Team[]) => {
      if (teams.length > 3) teams.pop();
      return teams;
    });
  }

  function onStartGame() {
    const status: RoomStatus = "waiting";
    update(roomRef, { status });
  }

  return {
    onNextCard,
    onPlayerChooseTeam,
    onAddTeam,
    onRemoveTeam,
    onStartGame,
  };
}
