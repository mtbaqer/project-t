import { ButtonColors } from "Theme/Colors";

export interface Team {
  members: string[];
  score: number;
  currentMemberIndex: number;
}

export interface User {
  id: string;
  name: string;
  avatarUrls: string[];
  timestamp: string;
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
  seenWordsIndices: number[];
  status: RoomStatus;
  players: Record<string, User>;
  playersHistory: Record<string, User>;
  timeSinceLastCard: number;
  lastGuess: boolean;
}

export type RoomStatus = "loading" | "lobby" | "waiting" | "playing" | "paused" | "ended";

export interface Settings {
  maxRounds: number;
  // packIds: string[];
  timePerRound: number;
}

export type Size = "xs" | "s" | "m" | "l" | "xl";

export interface AvatarImageMetadata {
  count: number;
  path: string;
  alt: string;
}

export interface Icon {
  src: string;
  alt: string;
  width: number;
  height: number;
  draggable?: boolean;
}

export type StatePair = [number, (value: number) => void];
