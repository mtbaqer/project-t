import { getDatabase, ref, runTransaction } from "firebase/database";
import { Howl } from "howler";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { roomAtom } from "../atoms/room";
import { Room } from "../types/types";

// const database = getDatabase();
export default function useSound(soundPath: string) {
  const sound = new Howl({ src: [soundPath] });
  // const room = useAtomValue(roomAtom);
  
  // const router = useRouter();
  // const { roomId } = router.query;
  // const roomRef = ref(database, `rooms/${roomId}`);

  function play() {
    sound.play();
  }

  // function onPlay() {
  //   runTransaction(roomRef, (room: Room) => {
  //     const newRoom: Room = {
  //       ...room,
  //       status: "paused",
  //     };
  //     return newRoom;
  //   });
  // }

  return { play };
}
