import { child, getDatabase, increment, ref, runTransaction, update } from "firebase/database";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { roomAtom } from "../atoms/room";
import { DefaultRoom, DefaultTeam } from "../constants/room";
import { Card, Room, Team, User, Word } from "../types/types";
import cleanupDisconnectedPlayers from "../utils/cleanupDisconnectedPlayers";
import fetchCards from "../utils/fetchCards";
import getTimestamp from "../utils/getTimestamp";

const database = getDatabase();
const firestore = getFirestore();

export default function useRoomActions() {
  const room = useAtomValue(roomAtom);

  const router = useRouter();
  const { roomId } = router.query;

  const roomRef = ref(database, `rooms/${roomId}`);
  const teamsRef = child(roomRef, "teams");

  async function onStartTurn() {
    const { cards: deck, wordsIndices } = await fetchCards(room.seenWordsIndices);
    const seenWordsIndices = room.seenWordsIndices ?? [];
    wordsIndices.forEach((index) => seenWordsIndices.push(index));

    runTransaction(roomRef, (room: Room) => {
      let currentTeamIndex = (room.currentTeamIndex + 1) % room.teams.length;

      while (currentTeamIndex === 0 || !room.teams[currentTeamIndex].members?.length) {
        currentTeamIndex = (currentTeamIndex + 1) % room.teams.length;
      }
      const team = room.teams[currentTeamIndex];
      cleanupDisconnectedPlayers(team, room.players);
      team.currentMemberIndex = (team.currentMemberIndex + 1) % team.members.length;

      const newRoom: Room = {
        ...room,
        round: currentTeamIndex === 1 ? room.round + 1 : room.round,
        currentCardIndex: 0,
        status: "playing",
        turnEndTime: getTimestamp() + 60 * 1000,
        currentTeamIndex,
        deck,
        seenWordsIndices: seenWordsIndices,
      };

      return newRoom;
    });
  }

  function onCorrect() {
    onNextCard(1);
  }

  function onTaboo() {
    onNextCard(-1);
  }

  function onNextCard(scoreIncrement: number) {
    runTransaction(roomRef, (room: Room) => {
      const currentTime = getTimestamp();
      if(currentTime - room.timeSinceLastCard > 2 * 1000){
        room.teams[room.currentTeamIndex].score += scoreIncrement;
        room.currentCardIndex++;
        room.timeSinceLastCard = currentTime;
      }
      return room;
    });
  }

  function onPause() {
    runTransaction(roomRef, (room: Room) => {
      const newRoom: Room = {
        ...room,
        status: "paused",
        turnTimeLeft: room!.turnEndTime - getTimestamp(),
      };
      return newRoom;
    });
  }

  function onResume() {
    runTransaction(roomRef, (room: Room) => {
      const newRoom: Room = {
        ...room,
        status: "playing",
        turnEndTime: getTimestamp() + room.turnTimeLeft,
      };
      return newRoom;
    });
  }

  function onEndTurn() {
    runTransaction(roomRef, (room: Room) => {
      const newRoom: Room = {
        ...room,
        status: "waiting",
      };
      return newRoom;
    });
  }

  function onFlipCard() {
    const currentCardRef = child(roomRef, `deck/${room.currentCardIndex}`);
    runTransaction(currentCardRef, (card: Card) => ({
      ...card,
      orientation: increment(card.orientation >= 2 ? -2 : 2),
    }));
  }

  function onRotateCard() {
    const currentCardRef = child(roomRef, `deck/${room.currentCardIndex}`);
    runTransaction(currentCardRef, (card: Card) => ({
      ...card,
      orientation: increment(card.orientation % 2 == 0 ? 1 : -1),
    }));
  }

  function onFlagCard() {
    const currentCard = room.deck?.[room.currentCardIndex];
    const currentWord = currentCard.words[currentCard.orientation];
    const currentWordRef = doc(firestore, `words/${currentWord.id}`);
    const newWord: Word = { ...currentWord, needsChange: true };
    setDoc(currentWordRef, newWord);
  }

  function onBackButton() {
    runTransaction(roomRef, (room: Room) => {
      const teams = room.teams.map(({ members }) => ({ ...DefaultTeam, members: members ?? [] }));
      const newRoom: Room = {
        ...DefaultRoom,
        teams,
        id: room.id,
        settings: room.settings,
        players: room.players,
        status: "loading",
        seenWordsIndices: room.seenWordsIndices,
      };
      return newRoom;
    });
  }

  return {
    onStartTurn,
    onCorrect,
    onTaboo,
    onPause,
    onResume,
    onEndTurn,
    onFlipCard,
    onRotateCard,
    onFlagCard,
    onBackButton,
  };
}
