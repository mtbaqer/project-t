import { child, update, onDisconnect, set, ref, getDatabase, runTransaction } from "firebase/database";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { authAtom, userAtom } from "../atoms/user";
import { User } from "../types/types";
import getTimestamp from "../utils/getTimestamp";

const database = getDatabase();

export default function useUserActions() {
  const auth = useAtomValue(authAtom);

  const setUser = useUpdateAtom(userAtom);

  const router = useRouter();
  const { roomId } = router.query;

  const roomRef = ref(database, `rooms/${roomId}`);
  const spectatorsMembersRef = child(roomRef, "teams/0/members");

  async function addUser(name: string, avatarUrls: string[]) {
    if (auth) {
      const timestamp = getTimestamp().toString();
      const user = { id: auth.id, name, avatarUrls, timestamp };
      await addToPlayers(user);
      await addToPlayersHistory(user);
      await addToSpectators(timestamp);

      setUser(user);
    }
  }

  async function addToPlayers(user: User) {
    const playersUserRef = child(roomRef, `players/${user.timestamp}`);
    await new Promise((r) => setTimeout(r, 1000));
    await set(playersUserRef, user);
    await onDisconnect(playersUserRef).remove();
  }

  async function addToPlayersHistory(user: User) {
    const playersHistoryUserRef = child(roomRef, `playersHistory/${user.id}`);
    await set(playersHistoryUserRef, user);
  }

  async function addToSpectators(timestamp: string) {
    runTransaction(spectatorsMembersRef, (spectatorsMembers?: string[]) => {
      spectatorsMembers = spectatorsMembers ?? [];
      if (!spectatorsMembers.includes(timestamp)) spectatorsMembers.push(timestamp);
      return spectatorsMembers;
    });
  }

  return { addUser, addToPlayers, addToSpectators };
}
