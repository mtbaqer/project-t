import { collection, getDocs, getFirestore, limit, query } from "firebase/firestore";
import { Card, Orientation, Word } from "../types/types";

const WordsPerCard = 4;
const CardsToFetch = 10;

const database = getFirestore();

export default async function fetchCards() {
  const q = query(collection(database, "words"), limit(WordsPerCard * CardsToFetch));
  const querySnapshot = await getDocs(q);

  const words: Word[] = [];
  querySnapshot.forEach((doc) => words.push(doc.data() as Word));

  const cards: Card[] = [];
  words.forEach((word, index) => {
    if (index % WordsPerCard == 0) cards.push({ words: [], orientation: Orientation.FrontTop });
    let card: Card = cards[Math.floor(index / WordsPerCard)];
    card.words.push(word);
  });

  return cards;
}
