import { child, getDatabase, increment, ref, runTransaction, update } from "firebase/database";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { roomAtom } from "../atoms/room";
import { Card, Room, Team, User, Word } from "../types/types";
import fetchCards from "../utils/fetchCards";

const database = getDatabase();
const firestore = getFirestore();

export default function useRoomActions() {
  const room = useAtomValue(roomAtom);

  const router = useRouter();
  const { roomId } = router.query;

  const roomRef = ref(database, `rooms/${roomId}`);
  const teamsRef = child(roomRef, "teams");

  async function onStartTurn() {
    const deck = await fetchCards();
    runTransaction(roomRef, (room: Room) => {
      const currentTeamIndex = (room.currentTeamIndex + 1) % room.teams.length;
      const currentUserTimestamp = getNextPlayingUserTimestamp(room.teams[currentTeamIndex]);
      room.teams[currentTeamIndex].currentUserTimestamp = currentUserTimestamp;
      const newRoom: Room = {
        ...room,
        round: currentTeamIndex === 0 ? room.round + 1 : room.round,
        currentCardIndex: 0,
        status: "playing",
        turnEndTime: Date.now() + 60 * 1000,
        currentTeamIndex,
        deck,
      };

      return newRoom;
    });
  }

  function getNextPlayingUserTimestamp(team: Team) {
    const { currentUserTimestamp } = team;
    const sortedTimestamps = Object.keys(team.members || {})
      .sort()
      .map(Number);

    let nextUserIndex = 0;
    for (let i = 0; i < sortedTimestamps.length; i++) {
      const timestamp = sortedTimestamps[i];
      if (timestamp > currentUserTimestamp) {
        nextUserIndex = i;
        break;
      }
    }

    const nextUserTimestamp = sortedTimestamps[nextUserIndex];
    return nextUserTimestamp ?? null;
  }

  function onCorrect() {
    onNextCard(1);
  }

  function onTaboo() {
    onNextCard(-1);
  }

  function onNextCard(scoreIncrement: number) {
    const teamRef = child(teamsRef, room!.currentTeamIndex.toString());
    update(teamRef, { score: increment(scoreIncrement) });
    update(roomRef, { currentCardIndex: increment(1) });
  }

  function onPause() {
    runTransaction(roomRef, (room: Room) => {
      const newRoom: Room = {
        ...room,
        status: "paused",
        turnTimeLeft: room!.turnEndTime - Date.now(),
      };
      return newRoom;
    });
  }

  function onResume() {
    runTransaction(roomRef, (room: Room) => {
      const newRoom: Room = {
        ...room,
        status: "playing",
        turnEndTime: Date.now() + room.turnTimeLeft,
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

  function onPlayerTeamChange(sourceTeamIndex: number, destinationTeamIndex: number, memberTimestamp: string) {
    runTransaction(teamsRef, (teams: Team[]) => {
      const sourceTeam = teams[sourceTeamIndex];
      const destinationTeam = teams[destinationTeamIndex];

      const member = sourceTeam.members[memberTimestamp];
      delete sourceTeam.members[memberTimestamp];

      destinationTeam.members = destinationTeam.members ?? {};
      destinationTeam.members[Date.now()] = member;

      return teams;
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
    onPlayerTeamChange,
  };
}
