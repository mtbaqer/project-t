import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import words from "../words";

const database = getFirestore();

export default async function uploadWords() {
  const wordsRef = collection(database, "words");
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    const wordRef = doc(wordsRef);
    setDoc(wordRef, { ...word, index, id: wordRef.id, needsChange: false });
  }
}
