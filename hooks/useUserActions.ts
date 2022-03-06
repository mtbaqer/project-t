import { child, update, onDisconnect, set, ref, getDatabase, runTransaction } from "firebase/database";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { userAtom, userIdAtom } from "../atoms/user";
import { User } from "../types/types";

const database = getDatabase();

export default function useUserActions() {
  const userId = useAtomValue(userIdAtom);

  const setUser = useUpdateAtom(userAtom);

  const router = useRouter();
  const { roomId } = router.query;

  const roomRef = ref(database, `rooms/${roomId}`);
  const spectatorsMembersRef = child(roomRef, "teams/0/members");

  async function addUser(name: string, avatarUrl: string) {
    if (userId) {
      const user = { id: userId, name, avatarUrl };
      const timestamp = Date.now().toString();
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
