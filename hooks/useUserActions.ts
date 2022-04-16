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

  async function addUser(name: string, avatarUrl: string) {
    if (auth) {
      const timestamp = getTimestamp().toString();
      const user = { id: auth.id, name, avatarUrl, timestamp };
      await addToPlayers(timestamp, user);
      await addToSpectators(timestamp);

      setUser(user);
    }
  }

  async function addToPlayers(timestamp: string, user: User) {
    const playersUserRef = child(roomRef, `players/${timestamp}`);
    await set(playersUserRef, user);
    await onDisconnect(playersUserRef).remove();
  }

  async function addToSpectators(timestamp: string) {
    runTransaction(spectatorsMembersRef, (spectatorsMembers?: User[]) => [...(spectatorsMembers ?? []), timestamp]);
  }

  return { addUser };
}
