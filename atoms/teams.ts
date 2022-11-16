import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { Team } from "../types/types";
import { roomAtom } from "./room";

export const teamsAtom = atom<Team[], Team[]>(
  (get) => get(roomAtom).teams,
  (get, set, updatedTeams) => set(roomAtom, { ...get(roomAtom), teams: updatedTeams })
);
export const currentTeamIndexAtom = selectAtom(roomAtom, (room) => room.currentTeamIndex);
