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
    if (playing && timeLeft) {
      setTimeoutRef(setTimeout(() => setTimeLeft(turnEndTime - +new Date()), 1000));
    } else if (timeoutRef) {
      clearTimeout(timeoutRef);
      setTimeoutRef(null);
    }
  }, [timeLeft, playing]);

  function formatTimeLeft() {
    if (timeLeft <= 0) {
      return "00:00";
    }

    const minutesLeft = Math.floor((timeLeft / 1000 / 60) % 60);
    const secondsLeft = Math.floor((timeLeft / 1000) % 60);

    const formattedMinutes = `0${minutesLeft}`;
    const formattedSeconds = `${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return { timer: formatTimeLeft(), setTurnEndTime, setPlaying };
}
