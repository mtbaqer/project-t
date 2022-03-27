import { selectAtom, useAtomValue, useUpdateAtom } from "jotai/utils";
import { useEffect, useRef } from "react";
import { roomAtom } from "../atoms/room";
import { timeLeftAtom } from "../atoms/timeLeft";
import getTimestamp from "../utils/getTimestamp";

const turnEndTimeAtom = selectAtom(roomAtom, (room) => room.turnEndTime);
const roomStatusAtom = selectAtom(roomAtom, (room) => room.status);

export default function useTimer() {
  const setTimeLeft = useUpdateAtom(timeLeftAtom);
  const turnEndTime = useAtomValue(turnEndTimeAtom);
  const roomStatus = useAtomValue(roomStatusAtom);
  const intervalRef = useRef<number>();

  useEffect(() => {
    setTimeLeft(turnEndTime - getTimestamp());
  }, [turnEndTime]);

  useEffect(() => {
    if (roomStatus === "playing") {
      intervalRef.current = window.setInterval(() => setTimeLeft(turnEndTime - getTimestamp()), 10);
    } else {
      window.clearInterval(intervalRef.current);
    }
  }, [roomStatus]);
}
