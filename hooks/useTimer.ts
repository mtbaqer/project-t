import { useEffect, useRef, useState } from "react";

export default function useTimer(turnEndTime: number, isPlaying: boolean) {
  const [timeLeft, setTimeLeft] = useState<number>(turnEndTime - +new Date());
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (isPlaying && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(turnEndTime - +new Date());
        // console.log("from interval");
      }, 1000);
    } else if (intervalRef.current) {
      console.log("from else");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isPlaying]);

  useEffect(() => {
    setTimeLeft(turnEndTime - +new Date());
  }, [turnEndTime]);

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

  return formatTimeLeft();
}
