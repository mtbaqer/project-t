import { atom } from "jotai";
import { User } from "../types/types";

export const userIdAtom = atom<string | null>(null);
export const userAtom = atom<User | null>(null);
