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

  const [draggedUser, setDraggedUser] = useAtom(activeDraggableAtom);

  function onDragStart(result: DragStartEvent) {
    setDraggedUser(result.active.data.current?.["user"] as User);
  }

  function onDragOver({ active, over }: DragEndEvent) {
    // console.log(active);
    const currentTeamIndex = getContainerId(active);
    const overTeamIndex = getContainerId(over);

    if (currentTeamIndex !== undefined || overTeamIndex !== undefined || currentTeamIndex === overTeamIndex) return;

    const activeUserId = active.id;
    const overPlayerIndex = getIndex(over);

    teams[currentTeamIndex].members;
  }

  function onDragEnd(result: DragEndEvent) {
    // onPlayerChooseTeam(Number(result.source.droppableId), Number(result.destination?.droppableId), result.draggableId);
    setDraggedUser(undefined);
    // onPlayerChooseTeam(result.active.data?.current?.sortable.containerId, );
    // console.log(result);
    // console.log(result.active.data?.current?.sortable.containerId);
  }

  function getContainerId(draggable: Active | Over | null) {
    return draggable?.data.current?.sortable.containerId;
  }

  function getIndex(over: Over | null) {
    return over?.data.current?.sortable.index ?? 0;
  }

  return { onDragStart, onDragOver, onDragEnd, draggedUser };
}
