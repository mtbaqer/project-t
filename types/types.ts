import Card from "../components/Card"

export interface Team {
  members: User[];
  score: number;
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
  host: User | null;
  coHosts: User[];
  currentCardIndex: number;
  currentTeamIndex: number;
  timer: Timer;
  settings: Settings;
  seenWords: Card[];
  status: RoomStatus;
}

export type RoomStatus = "waiting" | "playing" | "paused" | "ended";

export interface Timer {
  countdown: number;
  paused: boolean;
}

export interface Settings {
  maxRounds: number;
  // packIds: string[];
  timePerRound: number;
}
