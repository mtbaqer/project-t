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
  currentCard: Card | null;
  round: number;
  host: User | null;
  coHosts: User[];
  currentTeamIndex: number;
  timer: Timer;
  settings: Settings;
  ended: boolean;
}

export interface Timer {
  countdown: number;
  paused: boolean;
}

export interface Settings {
  maxRounds: number;
  // packIds: string[];
  timePerRound: number;
}
