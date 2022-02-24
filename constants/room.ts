import { Room } from "../types/types";

export const DefaultRoom: Room = {
  id: "default",
  teams: [
    { members: {}, score: 0, currentUserTimestamp: 0 },
    { members: {}, score: 0, currentUserTimestamp: 0 },
  ],
  spectators: [],
  deck: [],
  currentCardIndex: 0,
  round: 0,
  turnEndTime: 0,
  turnTimeLeft: 60 * 1000,
  currentTeamIndex: -1,
  settings: {
    maxRounds: 5,
    timePerRound: 60,
  },
  status: "loading",
  seenWords: [],
  hostQueue: {},
};

//Only for testing
export const TestRoom: Room = {
  id: "test",
  teams: [
    { members: {}, score: 0, currentUserTimestamp: 0 },
    { members: {}, score: 0, currentUserTimestamp: 0 },
  ],
  spectators: [],
  deck: [],
  currentCardIndex: 0,
  round: 0,
  turnEndTime: 0,
  turnTimeLeft: 60 * 1000,
  currentTeamIndex: -1,
  settings: {
    maxRounds: 5,
    timePerRound: 60,
  },
  status: "waiting",
  seenWords: [],
  hostQueue: {},
};
