import { child, getDatabase, increment, ref, runTransaction, update } from "firebase/database";
import { useAtomValue } from "jotai/utils";
import { roomAtom } from "../atoms/room";
import { TestRoom } from "../constants/room";
import { Room, Team } from "../types/types";
import fetchCards from "../utils/fetchCards";

const database = getDatabase();

export default function useRoomActions() {
  const room = useAtomValue(roomAtom);

  const roomRef = ref(database, `rooms/${TestRoom.id}`);
  const teamsRef = child(roomRef, "teams");

  async function onStartTurn() {
    const deck = await fetchCards();
    runTransaction(roomRef, (room: Room) => {
      const currentTeamIndex = (room.currentTeamIndex + 1) % room.teams.length;
      const currentUserTimestamp = getNextPlayingUserTimestamp(room.teams[currentTeamIndex]);
      room.teams[currentTeamIndex].currentUserTimestamp = currentUserTimestamp;
      const newRoom: Room = {
        ...room,
        round: currentTeamIndex === 0 ? room.round + 1 : room.round,
        currentCardIndex: 0,
        status: "playing",
        turnEndTime: +new Date() + 5 * 1000,
        currentTeamIndex,
        deck,
      };

      return newRoom;
    });
  }

  function getNextPlayingUserTimestamp(team: Team) {
    const { currentUserTimestamp } = team;
    const sortedTimestamps = Object.keys(team.members || {})
      .sort()
      .map(Number);

    let nextUserIndex = 0;
    for (let i = 0; i < sortedTimestamps.length; i++) {
      const timestamp = sortedTimestamps[i];
      if (timestamp > currentUserTimestamp) {
        nextUserIndex = i;
        break;
      }
    }

    const nextUserTimestamp = sortedTimestamps[nextUserIndex];
    return nextUserTimestamp ?? null;
  }

  function onCorrect() {
    onNextCard(1);
  }

  function onTaboo() {
    onNextCard(-1);
  }

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
        turnTimeLeft: room!.turnEndTime - +new Date(),
      };
      return newRoom;
    });
  }

  function onResume() {
    runTransaction(roomRef, (room: Room) => {
      const newRoom: Room = {
        ...room,
        status: "playing",
        turnEndTime: +new Date() + room.turnTimeLeft,
      };
      return newRoom;
    });
  }

  return { onStartTurn, onCorrect, onTaboo, onPause, onResume };
}
