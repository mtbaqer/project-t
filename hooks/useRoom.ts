import { useEffect } from "react";
import { Room, RoomStatus, User } from "../types/types";
import { child, getDatabase, onDisconnect, onValue, ref, set, update } from "firebase/database";
import useTimer from "./useTimer";
import { useAtom } from "jotai";
import { roomAtom } from "../atoms/room";
import { useRouter } from "next/router";
import useUser from "./useUser";
import { useUpdateAtom } from "jotai/utils";

const database = getDatabase();

export default function useRoom() {
  useTimer();
  useUser();

  const setRoom = useUpdateAtom(roomAtom);

  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    let unsubscribe = () => {};
    if (roomId) {
      unsubscribe = subscribeToRoom();
    }

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  function subscribeToRoom() {
    const roomRef = ref(database, `rooms/${roomId}`);

    return onValue(roomRef, (snapshot) => {
      console.log("fetched Room");
      if (!snapshot.exists()) router.push("/");
      else {
        const room = snapshot.val() as Room;
        console.log({ room: room.id });
        setRoom(room);
      }
    });
  }
}
