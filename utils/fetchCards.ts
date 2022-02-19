import { collection, getDocs, getFirestore, limit, query, snapshotEqual, where } from "firebase/firestore";
import { Card, Orientation, Word } from "../types/types";

const WordsPerCard = 4;
const CardsToFetch = 10;
const WordsCollectionLength = 1261;

const database = getFirestore();

export default async function fetchCards() {
  const words = await fetchWords();

  const cards: Card[] = [];
  words.forEach((word, index) => {
    if (index % WordsPerCard == 0) cards.push({ words: [], orientation: Orientation.FrontTop });
    let card = cards[Math.floor(index / WordsPerCard)];
    card.words.push(word);
  });

  return cards;
}

async function fetchWords() {
  const randomIndices = generateRandomIndices();
  const wordsFetches = randomIndices.map((index) => {
    const q = query(collection(database, "words"), where("index", "==", index));
    return getDocs(q).then((snapshot) => snapshot.docs[0].data() as Word);
  });
  return Promise.all(wordsFetches);
}

function generateRandomIndices() {
  const set = new Set<number>();
  while (set.size < WordsPerCard * CardsToFetch) {
    const random = randomInt();
    if (!set.has(random)) set.add(random);
  }
  return Array.from(set);
}

function randomInt(): number {
  return Math.floor(Math.random() * WordsCollectionLength);
}
