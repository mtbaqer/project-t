import { atom } from "jotai";
import { DefaultRoom } from "../constants/room";
import { Room } from "../types/types";
import { timeLeftAtom } from "./timeLeft";

const primitiveRoomAtom = atom<Room>(DefaultRoom);
export const roomAtom = atom<Room, Room>(
  (get) => {
    const room = get(primitiveRoomAtom);
    const timeLeft = get(timeLeftAtom);
    const status = room.status === "playing" && timeLeft <= 0 ? "waiting" : room.status;
    return { ...room, status };
  },
  (_get, set, updatedRoom) => set(primitiveRoomAtom, updatedRoom)
);
