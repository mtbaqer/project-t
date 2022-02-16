import { addDoc, collection, getFirestore } from "firebase/firestore";
import words from "../words";

const database = getFirestore();

export default async function uploadCards() {
  const wordsRef = collection(database, "words");
  for (const word of words) {
    addDoc(wordsRef, { ...word, needsChange: false });
  }
}
