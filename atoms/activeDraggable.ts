import { atom } from "jotai";
import { User } from "../types/types";

export const activeDraggableAtom = atom<string | undefined>(undefined);
