import { useAtom } from "jotai";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

import { authAtom } from "../atoms/user";

const firebaseAuth = getAuth();

export default function useAuth() {
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    subscribeToSignIn();
  }, []);

  function subscribeToSignIn() {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setAuth({ id: user.uid });
      else signIn();
    });
  }

  function signIn() {
    signInAnonymously(firebaseAuth);
  }

  return auth;
}
