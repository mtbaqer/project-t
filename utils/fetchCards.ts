import { collection, getDocs, getFirestore, limit, query } from "firebase/firestore";
import { Card } from "../types/types";

const database = getFirestore();

export default async function fetchCards() {
  const q = query(collection(database, "words"), limit(10));
  const words: Card[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    words.push(doc.data() as Card);
  });

  return words;
}
