import { child, update, onDisconnect, set, ref, getDatabase } from "firebase/database";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { roomAtom } from "../atoms/room";
import { userAtom, userIdAtom } from "../atoms/user";
import { RoomStatus, User } from "../types/types";

const database = getDatabase();

export default function useUserActions() {
  const userId = useAtomValue(userIdAtom);
  const room = useAtomValue(roomAtom);

  const setUser = useUpdateAtom(userAtom);

  const router = useRouter();
  const { roomId } = router.query;

  const roomRef = ref(database, `rooms/${roomId}`);
  // const teamsRef = child(roomRef, "teams");
  const spectatorsRef = child(roomRef, "spectators");

  async function addUser(name: string, avatarUrl: string) {
    if (userId) {
      const user = { id: userId, name, avatarUrl };
      await addToHostQueue();

      const teamIndex = getSmallestTeamIndex();

      // const memberRef = child(teamsRef, `${teamIndex.toString()}/members/${Date.now()}`);
      const memberRef = child(spectatorsRef, `${Date.now()}`);

      await update(memberRef, user);
      await onDisconnect(memberRef).remove();

      setUser(user);
    }
  }

  async function addToHostQueue() {
    if (isFirstPlayerToJoin()) {
      // const status: RoomStatus = "waiting";
      // update(roomRef, { status });
    }
    const myHostQueueRef = child(roomRef, `hostQueue/${Date.now()}`);
    await set(myHostQueueRef, userId);
    await onDisconnect(myHostQueueRef).remove();
  }

  function isFirstPlayerToJoin() {
    return !room.hostQueue;
  }

  function getSmallestTeamIndex() {
    const firstLength = Object.keys(room!.teams[0].members ?? {}).length ?? 0;
    const secondLength = Object.keys(room!.teams[1].members ?? {}).length ?? 0;
    return firstLength > secondLength ? 1 : 0;
  }

  return { addUser };
}
