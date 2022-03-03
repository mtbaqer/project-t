import { atom } from "jotai";
import { User } from "../types/types";

export const activeDraggableAtom = atom<User | undefined>(undefined);