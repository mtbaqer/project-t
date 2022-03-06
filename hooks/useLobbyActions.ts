import { child, getDatabase, increment, ref, runTransaction, update } from "firebase/database";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { roomAtom } from "../atoms/room";
import { Room, RoomStatus, Team } from "../types/types";

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

  function onPlayerChooseTeam(sourceTeamIndex: number, destinationTeamIndex: number, memberTimestamp: string) {
    // if (sourceTeamIndex === destinationTeamIndex) return;
    // runTransaction(roomRef, (room: Room) => {
    //   let member = null;
    //   console.log(destinationTeamIndex);
    //   if (sourceTeamIndex === -1) {
    //     member = room.spectators[memberTimestamp];
    //     delete room.spectators[memberTimestamp];
    //   } else {
    //     const sourceTeam = room.teams[sourceTeamIndex];
    //     member = sourceTeam.members[memberTimestamp];
    //     delete sourceTeam.members[memberTimestamp];
    //   }
    //   if (destinationTeamIndex === -1) {
    //     room.spectators = room.spectators ?? {};
    //     room.spectators[Date.now()] = member;
    //   } else {
    //     const destinationTeam = room.teams[destinationTeamIndex];
    //     destinationTeam.members = destinationTeam.members ?? {};
    //     destinationTeam.members[Date.now()] = member;
    //   }
    //   const newRoom: Room = {
    //     ...room,
    //     spectators: room.spectators ?? {},
    //     teams: room.teams,
    //   };
    //   return newRoom;
    // });
  }

  function onAddTeam() {
    runTransaction(teamsRef, (teams: Team[]) => {
      teams = teams ?? [];
      teams.push({ members: [], score: 0, currentMemberIndex: 0 });
      return teams;
    });
  }

  function onRemoveTeam() {
    runTransaction(teamsRef, (teams?: Team[]) => {
      teams?.pop();
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
