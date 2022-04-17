import { DatabaseReference, getDatabase, onDisconnect, push, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { DefaultRoom, TestRoom } from "../constants/room";

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
    await set(newRoomRef, { ...DefaultRoom, id, status: "lobby" });
    // need to remove room when everyone leaves the game/when they click end button
    // removeRoom(newRoomRef);
    return id;
  }

  async function removeRoom(roomRef: DatabaseReference) {
    await onDisconnect(roomRef).remove();
  }

  return { navigateToNewRoom };
}
