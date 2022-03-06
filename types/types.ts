export interface Team {
  members: { [key: string]: User };
  score: number;
  currentUserTimestamp: number;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Card {
  orientation: Orientation;
  words: Word[];
}

export enum Orientation {
  FrontTop,
  FrontBottom,
  BackTop,
  BackBottom,
}

export interface Word {
  id: string;
  targetWord: string;
  tabooWords: string[];
  index: number;
  needsChange: boolean;
}

export interface Room {
  id: string;
  teams: Team[];
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
  // players: { [key: number]: User };
}

export type RoomStatus = "loading" | "waiting" | "playing" | "paused" | "ended";

export interface Settings {
  maxRounds: number;
  // packIds: string[];
  timePerRound: number;
}
