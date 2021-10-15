import { useEffect, useState } from "react";
import { Room } from "../types/types";
import { getDatabase, onValue, ref, set } from "firebase/database";

const database = getDatabase();

const DefaultRoom: Room = {
  id: "default",
  teams: [],
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

export default function useRoom() {
  const [room, setRoom] = useState();

  useEffect(() => {
    // createRoom();
    fetchRoom();
  }, []);

  function createRoom() {
    set(ref(database, `rooms/${DefaultRoom.id}`), DefaultRoom);
  }

  function fetchRoom() {
    const roomRef = ref(database, `rooms/${DefaultRoom.id}`);
    onValue(roomRef, (snapshot) => {
      const room = snapshot.val() as Room;
      console.log(room);
    });
  }

  return room;
}
