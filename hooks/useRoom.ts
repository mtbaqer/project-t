import { useEffect, useState } from "react";
import { Room, RoomStatus, Team, User } from "../types/types";
import {
  child,
  getDatabase,
  increment,
  onDisconnect,
  onValue,
  ref,
  runTransaction,
  set,
  update,
} from "firebase/database";
import useUser from "./useUser";
import { v4 as uuidv4 } from "uuid";
import useCards from "./useCards";
import useTimer from "./useTimer";
import { settings } from "firebase/analytics";
import fetchCards from "../utils/fetchCards";

const database = getDatabase();

const DefaultRoom: Room = {
  id: "default",
  teams: [
    { members: {}, score: 0, currentUserTimestamp: 0 },
    { members: {}, score: 0, currentUserTimestamp: 0 },
  ],
  spectators: [],
  deck: [],
  currentCardIndex: 0,
  round: 0,
  turnEndTime: 0,
  turnTimeLeft: 60 * 1000,
  currentTeamIndex: -1,
  settings: {
    maxRounds: 5,
    timePerRound: 60,
  },
  status: "waiting",
  seenWords: [],
  hostQueue: {},
};

const roomRef = ref(database, `rooms/${DefaultRoom.id}`);
const teamsRef = child(roomRef, "teams");

export default function useRoom() {
  const [room, setRoom] = useState<Room | null>(null);

  const { userId } = useUser();

  const { setPlaying, setTurnEndTime, timeLeft } = useTimer();

  useEffect(() => {
    // createRoom();
    subscribeToRoom();
  }, []);

  useEffect(() => {
    if (room && userId) {
      for (const team of room.teams) {
        for (const member of Object.values(team.members || {})) {
          if (member.id === userId) {
            return () => {};
          }
        }
      }
      const username = prompt("Enter your username");
      const user = { name: username ? username : "Bitch", id: userId };
      addUser(user);
    }
  }, [room, userId]);

  useEffect(() => {
    if (room) {
      setPlaying(room.status === "playing");
      setTurnEndTime(room.turnEndTime);
    }
  }, [room]);

  useEffect(() => {
    if (userId) {
      const myHostQueueRef = child(roomRef, `hostQueue/${+new Date()}`);
      set(myHostQueueRef, userId);
      onDisconnect(myHostQueueRef).remove();
    }
  }, [userId]);

  function createRoom() {
    set(roomRef, DefaultRoom);
  }

  function subscribeToRoom() {
    onValue(roomRef, (snapshot) => {
      const room = snapshot.val() as Room;
      setRoom(room);
    });
  }

  async function onStartTurn() {
    const deck = await fetchCards();
    runTransaction(roomRef, (room: Room) => {
      const currentTeamIndex = (room.currentTeamIndex + 1) % room.teams.length;
      const currentUserTimestamp = getNextPlayingUserTimestamp(room.teams[currentTeamIndex]);
      //If you did this, kill yourself
      room.teams[currentTeamIndex].currentUserTimestamp = currentUserTimestamp;
      const newRoom: Room = {
        ...room,
        currentCardIndex: 0,
        status: "playing",
        turnEndTime: +new Date() + room.settings.timePerRound * 1000,
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
    return nextUserTimestamp;
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

  function addUser(user: User) {
    const teamIndex = getSmallestTeamIndex();

    const memberRef = child(teamsRef, `${teamIndex.toString()}/members/${+new Date()}`);

    update(memberRef, user);
    onDisconnect(memberRef).remove();
  }

  function getSmallestTeamIndex() {
    const firstLength = Object.keys(room!.teams[0].members ?? {}).length ?? 0;
    const secondLength = Object.keys(room!.teams[1].members ?? {}).length ?? 0;
    return firstLength > secondLength ? 1 : 0;
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

  function getStatus(): RoomStatus {
    if (room!.status === "playing") {
      return timeLeft > 0 ? "playing" : "waiting";
    }
    return room!.status;
  }

  return {
    room: room ? { ...room!, status: getStatus() } : undefined,
    addUser,
    onStartTurn,
    onCorrect,
    onTaboo,
    onPause,
    onResume,
    createRoom,
  };
}
