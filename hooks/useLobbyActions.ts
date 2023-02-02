import { child, getDatabase, increment, ref, runTransaction, update } from "firebase/database";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { roomAtom } from "../atoms/room";
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

  function onSetNumberOfTeams(numberOfTeams: string) {
    let desiredNumberOfTeams = parseInt(numberOfTeams);
    runTransaction(teamsRef, (teams: Team[]) => {
      let difference = desiredNumberOfTeams + 1 - teams.length;
      if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          teams.push(DefaultTeam);
        }
      }
      if (difference < 0) {
        difference *= -1;
        for (let i = 0; i < difference; i++) {
          teams.pop();
        }
      }
      return teams;
    });
  }
  function onSetNumberOfRounds(numberOfRounds: string) {
    let rounds = parseInt(numberOfRounds);
    runTransaction(roomRef, (room: Room) => {
      room.settings.maxRounds = rounds;
      return room;
    });
  }

  function onSetTimePerRound(timePerRound: string) {
    let time = parseInt(timePerRound);
    runTransaction(roomRef, (room: Room) => {
      room.settings.timePerRound = time;
      return room;
    });
  }

  function onStartGame() {
    const status: RoomStatus = "waiting";
    update(roomRef, { status });
  }

  async function onCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
  }
  function onSetting() {
    const status: RoomStatus = "settings";
    update(roomRef, { status });
  }

  return {
    onPlayerChooseTeam,
    onSetting,
    onStartGame,
    onCopyLink,
    onSetNumberOfTeams,
    onSetNumberOfRounds,
    onSetTimePerRound,
  };
}
