import { Room } from "../types/types";
export default function checkIfGameEndedStatus(room: Room) {
  if (room.round == room.settings.maxRounds && room.currentTeamIndex == room.teams.length - 1) {
    return "ended";
  } else {
    return "waiting";
  }
}
