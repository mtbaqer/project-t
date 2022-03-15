import { collection, getDocs, getFirestore, limit, query, snapshotEqual, where } from "firebase/firestore";
import { Card, Orientation, Word } from "../types/types";

const WordsPerCard = 4;
const CardsToFetch = 20;
const WordsCollectionLength = 1261;

const database = getFirestore();

export default async function fetchCards(seenWordsIndices: number[]) {
  const { words, wordsIndices } = await fetchWords(seenWordsIndices);

  const cards: Card[] = [];
  words.forEach((word, index) => {
    if (index % WordsPerCard == 0) cards.push({ words: [], orientation: Orientation.FrontTop });
    let card = cards[Math.floor(index / WordsPerCard)];
    card.words.push(word);
  });

  return { cards, wordsIndices };
}

async function fetchWords(seenWordsIndices: number[]) {
  const randomIndices = generateRandomIndices(seenWordsIndices);
  const indicesSubArrays = splitIntoSubArrays(randomIndices);

  const queries = [];

  for (let subArray of indicesSubArrays) {
    const q = query(collection(database, "words"), where("index", "in", subArray));
    queries.push(getDocs(q));
  }

  const words = [];
  const snapshots = await Promise.all(queries);
  for (let snapshot of snapshots) {
    for (let doc of snapshot.docs) {
      words.push(doc.data() as Word);
    }
  }
  return { words, wordsIndices: randomIndices };
}

function splitIntoSubArrays(indices: number[]) {
  const times = Math.floor(indices.length / 10);
  const output = [];
  for (let i = 0; i < times; i++) {
    output.push(indices.slice(10 * i, 10 * (i + 1)));
  }
  return output;
}

function generateRandomIndices(seenWordsIndices: number[]) {
  const set = new Set<number>();
  const seenSet = new Set(seenWordsIndices);
  while (set.size < WordsPerCard * CardsToFetch) {
    const random = randomInt();
    if (!seenSet.has(random)) set.add(random);
  }
  return Array.from(set);
}

function randomInt(): number {
  return Math.floor(Math.random() * WordsCollectionLength);
}
