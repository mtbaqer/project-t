import { useAtom } from "jotai";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

import { userIdAtom } from "../atoms/user";

const auth = getAuth();

export default function useUser() {
  const [userId, setUserId] = useAtom(userIdAtom);

  useEffect(() => {
    subscribeToSignIn();
  }, []);

  function subscribeToSignIn() {
    onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else signIn();
    });
  }

  function signIn() {
    signInAnonymously(auth);
  }

  return { userId };
}
