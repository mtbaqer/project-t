import { child, getDatabase, increment, ref, runTransaction, update } from "firebase/database";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { roomAtom } from "../atoms/room";
import { Card, Room, RoomStatus, Team, User, Word } from "../types/types";
import fetchCards from "../utils/fetchCards";

const database = getDatabase();
const firestore = getFirestore();

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

  function onPause() {
    runTransaction(roomRef, (room: Room) => {
      const newRoom: Room = {
        ...room,
        status: "paused",
        turnTimeLeft: room!.turnEndTime - Date.now(),
      };
      return newRoom;
    });
  }

  function onPlayerChooseTeam(sourceTeamIndex: number, destinationTeamIndex: number, memberTimestamp: string) {        
    runTransaction(roomRef, (room: Room) => {
      // think of a cleaner way
      let member = null;
      console.log(sourceTeamIndex);
      if(sourceTeamIndex === -1) {
        member = room.spectators[memberTimestamp];
        delete room.spectators[memberTimestamp];
      } else {
        const sourceTeam = room.teams[sourceTeamIndex];
        member = sourceTeam.members[memberTimestamp];
        delete sourceTeam.members[memberTimestamp];
      }
      
      const destinationTeam = room.teams[destinationTeamIndex];

      destinationTeam.members = destinationTeam.members ?? {};
      destinationTeam.members[Date.now()] = member;
      const newRoom: Room = {
        ...room,
        spectators: room.spectators ?? {},
        teams: room.teams,
      };
      return newRoom;
    });
  }

  function onAddTeam() {
    runTransaction(teamsRef, (teams: Team[]) => {
      if(teams) teams[teams.length] = { members: {}, score: 0, currentUserTimestamp: 0 };
      else teams = [{ members: {}, score: 0, currentUserTimestamp: 0 }];
      return teams;
    });
  }

  function onRemoveTeam() {
    runTransaction(teamsRef, (teams: Team[]) => {
      if(teams) teams.pop();
      return teams;
    });
  }

  function onStartGame(){
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
