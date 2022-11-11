import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { DefaultRoom } from "../constants/room";
import { Room, Team } from "../types/types";
import cleanupDisconnectedPlayers from "../utils/cleanupDisconnectedPlayers";
import { timeLeftAtom } from "./timeLeft";

const primitiveRoomAtom = atom<Room>(DefaultRoom);
export const roomAtom = atom<Room, Room>(
  (get) => {
    const room = get(primitiveRoomAtom);

    const timeLeft = get(timeLeftAtom);
    // const status = "ended"
    const status = room.status === "playing" && timeLeft <= 0 ? "waiting" : room.status;

    const teams = room.teams.map((team) => cleanupDisconnectedPlayers(team, room.players));

    return { ...room, status, teams };
  },
  (_get, set, updatedRoom) => set(primitiveRoomAtom, updatedRoom)
);

export const roomStatusAtom = selectAtom(roomAtom, (room) => room.status);
