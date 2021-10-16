import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, getFirestore, limit, query, setDoc } from "firebase/firestore";

const database = getFirestore();

export default function useTimer(turnEndTime: number, isPlaying:boolean) {
  const [timeLeft, setTimeLeft] = useState<number>(turnEndTime - +new Date());
  useEffect(() => {
    if(timeLeft > 0 && isPlaying) setTimeout(()=>setTimeLeft(turnEndTime- +new Date()), 1000);
  }, [timeLeft, isPlaying]);

  useEffect(() => {
    setTimeLeft(turnEndTime- +new Date());
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
