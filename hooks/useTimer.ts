import { atom, useAtom } from "jotai";
import { selectAtom, useAtomValue, useUpdateAtom } from "jotai/utils";
import { useEffect, useRef } from "react";
import { roomAtom } from "../atoms/room";
import { timeLeftAtom } from "../atoms/timeLeft";

const turnEndTimeAtom = selectAtom(roomAtom, (room) => room.turnEndTime);
const roomStatusAtom = selectAtom(roomAtom, (room) => room.status);

export default function useTimer() {
  const setTimeLeft = useUpdateAtom(timeLeftAtom);
  const turnEndTime = useAtomValue(turnEndTimeAtom);
  const roomStatus = useAtomValue(roomStatusAtom);
  const intervalRef = useRef<number>();

  useEffect(() => {
    setTimeLeft(turnEndTime - Date.now());
  }, [turnEndTime]);

  useEffect(() => {
    if (roomStatus === "playing") {
      intervalRef.current = window.setInterval(() => setTimeLeft(turnEndTime - Date.now()), 1000);
    } else {
      window.clearInterval(intervalRef.current);
    }
  }, [roomStatus]);
}
