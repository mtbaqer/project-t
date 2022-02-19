import { Howl } from "howler";
import { useState } from "react";

export default function useSound(soundPath: string) {
  const sound = new Howl({ src: [soundPath] });

  function play() {
    sound.play();
  }

  return { play };
}
