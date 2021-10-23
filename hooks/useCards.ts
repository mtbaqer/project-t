import { useEffect, useState } from "react";
import { Card } from "../types/types";
import { addDoc, collection, doc, getDocs, getFirestore, limit, query, setDoc } from "firebase/firestore";

const database = getFirestore();

export default function useCards() {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    const q = query(collection(database, "words"), limit(2));
    const tempCards: Card[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempCards.push(doc.data() as Card);
    });
    setCards(tempCards);
  }

  return { cards, fetchCards };
}
