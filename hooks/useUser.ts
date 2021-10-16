import { atom, useAtom } from "jotai";
import { useState } from "react";
import { User } from "../types/types";

const userAtom = atom<User | null>(null);

export default function useUser() {
  const [user, setUser] = useAtom(userAtom);

  return { user, setUser };
}
