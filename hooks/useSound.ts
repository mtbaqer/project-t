import { Howl } from "howler";

export default function useSound(soundPath: string) {
  const sound = new Howl({ src: [soundPath] });

  function play() {
    sound.play();
  }

  return { play };
}
