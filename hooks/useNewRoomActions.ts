import { getDatabase, onDisconnect, push, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { DefaultRoom } from "../constants/room";

export default function useNewRoomActions() {
  const router = useRouter();
  const database = getDatabase();

  async function navigateToNewRoom() {
    const roomId = await generateNewRoom();
    router.push(`/room/${roomId}`);
  }

  async function generateNewRoom() {
    const roomsRef = ref(database, `rooms`);
    const newRoomRef = await push(roomsRef);
    const id = newRoomRef.key;
    await set(newRoomRef, { ...DefaultRoom, id });
    // need to add logic to remove room when everyone has left/when they click end game
    // await onDisconnect(newRoomRef).remove();
    return id;
  }

  return { navigateToNewRoom };
}
