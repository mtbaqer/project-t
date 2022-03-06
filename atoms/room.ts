import { atom } from "jotai";
import { DefaultRoom } from "../constants/room";
import { Room, Team } from "../types/types";
import { timeLeftAtom } from "./timeLeft";

const primitiveRoomAtom = atom<Room>(DefaultRoom);
export const roomAtom = atom<Room, Room>(
  (get) => {
    const room = get(primitiveRoomAtom);
    const timeLeft = get(timeLeftAtom);
    const status = room.status === "playing" && timeLeft <= 0 ? "waiting" : room.status;

    function filterDisconnectedPlayers(team: Team) {
      return {
        ...team,
        members: team.members.filter((timestamp) => timestamp in room.players),
      };
    }
    const teams = room.teams.map(filterDisconnectedPlayers);

    return { ...room, status, teams };
  },
  (_get, set, updatedRoom) => set(primitiveRoomAtom, updatedRoom)
);
