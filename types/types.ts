export interface Team {
  members: User[];
}

export interface User {
  name: string;
}

export interface Card {
  targetWord: string;
  tabooWords: string[];
}
