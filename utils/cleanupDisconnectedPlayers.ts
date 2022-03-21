import { Team, User } from "../types/types";

export default function cleanupDisconnectedPlayers(team: Team, connectedPlayersTimestamps: Record<string, User>) {
  team.members = team.members ?? [];
  team.members = team.members.filter((timestamp, index) => {
    const isConnected = connectedPlayersTimestamps && timestamp in connectedPlayersTimestamps;
    if (!isConnected && index <= team.currentMemberIndex) team.currentMemberIndex--;
    return isConnected;
  });
  return team;
}
