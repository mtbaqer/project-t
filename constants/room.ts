import { Room, Team } from "../types/types";

export const DefaultTeam: Team = { members: [], score: 0, currentMemberIndex: -1 };

export const DefaultRoom: Room = {
  id: "default",
  players: {},
  teams: [DefaultTeam, DefaultTeam],
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
};

//Only for testing
export const TestRoom: Room = {
  id: "test",
  players: {
    "123": {
      id: "123",
      name: "some name",
      avatarUrl: "",
    },
    "321": {
      id: "321",
      name: "some name 2",
      avatarUrl: "",
    },
    "111": {
      id: "111",
      name: "some name 3",
      avatarUrl: "",
    },
    "222": {
      id: "222",
      name: "some name 4",
      avatarUrl: "",
    },
    "333": {
      id: "333",
      name: "some name 5",
      avatarUrl: "",
    },
    "444": {
      id: "444",
      name: "some name 6",
      avatarUrl: "",
    },
    "555": {
      id: "555",
      name: "some name 7",
      avatarUrl: "",
    },
    "666": {
      id: "666",
      name: "some name 8",
      avatarUrl: "",
    },
    "777": {
      id: "777",
      name: "some name 9",
      avatarUrl: "",
    },
    "888": {
      id: "888",
      name: "some name 10",
      avatarUrl: "",
    },
    "999": {
      id: "999",
      name: "some name 99",
      avatarUrl: "",
    },
  },
  teams: [
    {
      members: ["123", "321", "111","222","333","777","888","999","444","555"],
      score: 0,
      currentMemberIndex: -1,
    },
    {
      members: [],
      score: 0,
      currentMemberIndex: -1,
    },
    {
      members: [],
      score: 0,
      currentMemberIndex: -1,
    },
    {
      members: [],
      score: 0,
      currentMemberIndex: -1,
    },
  ],
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
};
