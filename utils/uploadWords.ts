import { addDoc, collection, getFirestore } from "firebase/firestore";
import words from "../words";

const database = getFirestore();

export default async function uploadWords() {
  const wordsRef = collection(database, "words");
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    addDoc(wordsRef, { ...word, needsChange: false, index });
  }
}
