import { useEffect, useState } from "react";
import { Room, User } from "../types/types";
import { child, Database, getDatabase, onValue, push, ref, set, update } from "firebase/database";
import useUser from "./useUser";
import { v4 as uuidv4 } from "uuid";

const database = getDatabase();

const DefaultRoom: Room = {
  id: "default",
  teams: [
    { members: [], score: 0 },
    { members: [], score: 0 },
  ],
  spectators: [],
  deck: [],
  currentCard: null,
  round: 0,
  host: null,
  coHosts: [],
  currentTeamIndex: 0,
  timer: {
    countdown: 60,
    paused: true,
  },
  settings: {
    maxRounds: 5,
    timePerRound: 60,
  },
  ended: false,
};

const roomRef = ref(database, `rooms/${DefaultRoom.id}`);
const teamsRef = child(roomRef, "teams");

export default function useRoom() {
  const [room, setRoom] = useState<Room | null>(null);

  const { user, setUser } = useUser();

  useEffect(() => {
    // createRoom();
    fetchRoom();
  }, []);

  useEffect(() => {
    if (room && !user) {
      const id = uuidv4();
      const username = prompt("Enter your username");
      const user = { name: username ?? "Bitch", id };
      addUser(user);
      setUser(user);
    }
  }, [room]);

  function createRoom() {
    set(roomRef, DefaultRoom);
  }

  function fetchRoom() {
    onValue(roomRef, (snapshot) => {
      const room = snapshot.val() as Room;
      setRoom(room);
    });
  }

  function addUser(user: User) {
    const teamIndex = getSmallestTeamIndex();

    const teamRef = child(teamsRef, teamIndex.toString());

    const members = [...(room!.teams[teamIndex].members || []), user];

    update(teamRef, { members });
  }

  function getSmallestTeamIndex() {
    const firstLength = room!.teams[0].members?.length ?? 0;
    const secondLength = room!.teams[1].members?.length ?? 0;
    return firstLength > secondLength ? 1 : 0;
  }

  return { room, addUser };
}
