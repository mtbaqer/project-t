import { useAtom } from "jotai";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { authAtom, userAtom } from "../atoms/user";
import { useAtomValue } from "jotai/utils";
import { roomAtom } from "../atoms/room";
import useUserActions from "./useUserActions";
import { User } from "../types/types";

const firebaseAuth = getAuth();

export default function useUser() {
  const [auth, setAuth] = useAtom(authAtom);
  const [user, setUser] = useAtom(userAtom);
  const room = useAtomValue(roomAtom);

  const { addToPlayers, addToSpectators } = useUserActions();

  useEffect(() => {
    subscribeToSignIn();
  }, []);

  function subscribeToSignIn() {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setAuth({ id: user.uid });
      else signInAnonymously(firebaseAuth);
    });
  }

  useEffect(() => {
    if (room.status !== "loading" && auth && room.playersHistory?.[auth.id]) {
      reAddUser(room.playersHistory[auth.id]);
    }
  }, [room.status, auth, room.playersHistory]);

  async function reAddUser(user: User) {
    await addToPlayers(user);
    setUser(user);
  }

  useEffect(() => {
    if (user && room.players?.[user.timestamp] && !isInATeam(user)) {
      addToSpectators(user.timestamp);
    }
  }, [room.players, user]);

  function isInATeam(user: User) {
    const allTeamsMembers = room.teams.flatMap((team) => team.members);
    return allTeamsMembers.includes(user.timestamp);
  }
}
