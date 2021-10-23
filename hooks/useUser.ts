import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { User } from "../types/types";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

const auth = getAuth();

const userIdAtom = atom<string | null>(null);

export default function useUser() {
  // const [user, setUser] = useAtom(userAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  useEffect(() => {
    subscribeToSignIn();
  }, []);

  function subscribeToSignIn() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        signIn();
      }
    });
  }

  function signIn() {
    signInAnonymously(auth);
  }

  return { userId };
}
