import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

const timeLeftAtom = atom(0);
const timeoutRefAtom = atom<NodeJS.Timer | null>(null);
const turnEndTimeAtom = atom(0);
const playingAtom = atom(true);

export default function useTimer() {
  const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom);
  const [timeoutRef, setTimeoutRef] = useAtom(timeoutRefAtom);

  const [turnEndTime, setTurnEndTime] = useAtom(turnEndTimeAtom);
  const [playing, setPlaying] = useAtom(playingAtom);

  useEffect(() => {
    setTimeLeft(turnEndTime - +new Date());
  }, [turnEndTime]);

  useEffect(() => {
    if (playing && timeLeft > 0) {
      setTimeoutRef(setTimeout(() => setTimeLeft(turnEndTime - +new Date()), 1000));
    } else if (timeoutRef) {
      clearTimeout(timeoutRef);
      setTimeoutRef(null);
    }
  }, [timeLeft, playing]);

  return { timeLeft, setTurnEndTime, setPlaying };
}
