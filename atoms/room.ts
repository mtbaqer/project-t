import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { DefaultRoom } from "../constants/room";
import { Room } from "../types/types";
import cleanupDisconnectedPlayers from "../utils/cleanupDisconnectedPlayers";
import { timeLeftAtom } from "./timeLeft";
import checkIfGameEndedStatus from "../utils/checkIfGameEndedStatus";

const primitiveRoomAtom = atom<Room>(DefaultRoom);
export const roomAtom = atom<Room, Room>(
  (get) => {
    const room = get(primitiveRoomAtom);

    const timeLeft = get(timeLeftAtom);

    function getRoomStatus() {
      if (room.status === "playing" && timeLeft <= 0) {
        return checkIfGameEndedStatus(room);
      }
      return room.status;
    }

    const status = getRoomStatus();

    const teams = room.teams.map((team) => cleanupDisconnectedPlayers(team, room.players));

    return { ...room, status, teams };
  },
  (_get, set, updatedRoom) => set(primitiveRoomAtom, updatedRoom)
);

export const roomStatusAtom = selectAtom(roomAtom, (room) => room.status);
