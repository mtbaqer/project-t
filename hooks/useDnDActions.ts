import { DragStartEvent, DragEndEvent, Active, Over } from "@dnd-kit/core";
import { atom, useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { activeDraggableAtom } from "../atoms/activeDraggable";
import { roomAtom } from "../atoms/room";
import { Room, Team, User } from "../types/types";
import useLobbyActions from "./useLobbyActions";

const teamsAtom = atom<Team[], Team[]>(
  (get) => get(roomAtom).teams,
  (get, set, updatedTeams) => set(roomAtom, { ...get(roomAtom), teams: updatedTeams })
);

export default function useDnDActions() {
  const { onPlayerChooseTeam } = useLobbyActions();
  const [teams, setTeams] = useAtom(teamsAtom);

  const [draggedTimestamp, setDraggedTimestamp] = useAtom(activeDraggableAtom);

  function onDragStart(result: DragStartEvent) {
    setDraggedTimestamp(result.active.id);
  }

  function onDragOver({ active, over }: DragEndEvent) {
    const currentTeamIndex = getContainerId(active);
    const overTeamIndex = getContainerId(over);
    if (currentTeamIndex === undefined || overTeamIndex === undefined || currentTeamIndex === overTeamIndex) return;

    const activeUserTimestamp = active.id;
    const overPlayerIndex = getIndex(over);

    teams[currentTeamIndex].members = teams[currentTeamIndex].members.filter(
      (timestamp) => timestamp !== activeUserTimestamp
    );

    teams[overTeamIndex].members = teams[overTeamIndex].members ?? [];
    teams[overTeamIndex].members.splice(overPlayerIndex, 0, activeUserTimestamp);

    setTeams(teams);
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    setDraggedTimestamp(undefined);

    const currentTeamIndex = getContainerId(active);
    const overTeamIndex = getContainerId(over);
    if (currentTeamIndex === undefined || overTeamIndex === undefined) return;

    const activeUserTimestamp = active.id;
    const overPlayerIndex = getIndex(over);
    onPlayerChooseTeam(activeUserTimestamp, overTeamIndex, overPlayerIndex);
  }

  function getContainerId(draggable: Active | Over | null) {
    return draggable?.data.current?.sortable.containerId ?? draggable?.id;
  }

  function getIndex(over: Over | null) {
    return over?.data.current?.sortable.index || 0;
  }

  return { onDragStart, onDragOver, onDragEnd, draggedTimestamp };
}
