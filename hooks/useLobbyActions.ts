import { child, getDatabase, ref, runTransaction, update } from "firebase/database";
import { useRouter } from "next/router";
import { DefaultTeam } from "../constants/room";
import { Room, RoomStatus, Team } from "../types/types";
import cleanupDisconnectedPlayers from "../utils/cleanupDisconnectedPlayers";

const database = getDatabase();

export default function useLobbyActions() {
  const router = useRouter();
  const { roomId } = router.query;

  const roomRef = ref(database, `rooms/${roomId}`);
  const teamsRef = child(roomRef, "teams");

  function onPlayerChooseTeam(memberTimestamp: string, destinationTeamIndex: number, destinationPlayerIndex: number) {
    runTransaction(roomRef, (room: Room) => {
      const sourceTeam = room.teams.find((team) => team.members?.includes(memberTimestamp));
      if (sourceTeam) sourceTeam.members = sourceTeam.members.filter((timestamp) => timestamp !== memberTimestamp);

      const destinationTeam = room.teams[destinationTeamIndex];
      destinationTeam.members = destinationTeam.members ?? [];
      cleanupDisconnectedPlayers(destinationTeam, room.players);
      destinationTeam.members.splice(destinationPlayerIndex, 0, memberTimestamp);

      return room;
    });
  }

  function onAddTeam() {
    runTransaction(teamsRef, (teams: Team[]) => {
      if (teams.length < 7) teams.push(DefaultTeam);
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
    let canBeStarted = true;
    let numberOfTotalTeamPlayers: number;
    runTransaction(teamsRef, (teams: Team[]) => {
      if (teams.length < 2) canBeStarted = false;
      teams.forEach((team, index) => {
        team.members ??= [];
        if (index != 0 && team.members?.length < 2) canBeStarted = false;
        if (index != 0) numberOfTotalTeamPlayers += team.members?.length;
        if (numberOfTotalTeamPlayers > 12) canBeStarted = false;
      });
      return teams;
    });
    if (canBeStarted) {
      const status: RoomStatus = "waiting";
      update(roomRef, { status });
    } else {
      alert("There must be at least two players on each team and no more than 12 players total!");
    }
  }

  async function onCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
  }

  return {
    onPlayerChooseTeam,
    onAddTeam,
    onRemoveTeam,
    onStartGame,
    onCopyLink,
  };
}
