import Card from "../components/Card";

export interface Team {
  members: { [key: string]: User };
  score: number;
  currentUserTimestamp: number;
}

export interface User {
  id: string;
  name: string;
}

export interface Card {
  targetWord: string;
  tabooWords: string[];
  orientation: "up" | "down";
  side: "front" | "back";
}

export interface Room {
  id: string;
  teams: Team[];
  spectators: User[];
  deck: Card[];
  round: number;
  currentCardIndex: number;
  currentTeamIndex: number;
  turnTimeLeft: number;
  turnEndTime: number;
  settings: Settings;
  seenWords: Card[];
  status: RoomStatus;
  hostQueue: { [key: number]: string };
}

export type RoomStatus = "waiting" | "playing" | "paused" | "ended";

export interface Settings {
  maxRounds: number;
  // packIds: string[];
  timePerRound: number;
}
