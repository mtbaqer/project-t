import { useEffect } from "react";
import { Room, RoomStatus, User } from "../types/types";
import { child, getDatabase, onDisconnect, onValue, ref, set, update } from "firebase/database";
import useTimer from "./useTimer";
import { useAtom } from "jotai";
import { roomAtom } from "../atoms/room";
import { useRouter } from "next/router";
import useAuth from "./useAuth";

const database = getDatabase();

export default function useRoom() {
  useTimer();
  useAuth();

  const [room, setRoom] = useAtom(roomAtom);

  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    if (roomId) subscribeToRoom();
  }, [roomId]);

  function subscribeToRoom() {
    const roomRef = ref(database, `rooms/${roomId}`);

    onValue(roomRef, (snapshot) => {
      if (!snapshot.exists()) router.push("/");
      else {
        const room = snapshot.val() as Room;
        setRoom(room);
      }
    });
  }

  return { room };
}
