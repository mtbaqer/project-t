import { selectAtom } from "jotai/utils";
import { roomAtom } from "./room";

export const teamsAtom = selectAtom(roomAtom, (room) => room.teams);
export const currentTeamIndexAtom = selectAtom(roomAtom, (room) => room.currentTeamIndex);
