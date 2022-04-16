import { atom } from "jotai";
import { User } from "../types/types";

export const authAtom = atom<{ id: string } | null>(null);
export const userAtom = atom<User | null>(null);
