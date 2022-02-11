import { useEffect } from "react";
import { Room, RoomStatus, User } from "../types/types";
import { child, getDatabase, onDisconnect, onValue, ref, set, update } from "firebase/database";
import useUser from "./useUser";
import useCards from "./useCards";
import useTimer from "./useTimer";
import { DefaultRoom } from "../constants/room";
import { atom, useAtom } from "jotai";
import { roomAtom } from "../atoms/room";

const database = getDatabase();
const roomRef = ref(database, `rooms/${DefaultRoom.id}`);
const teamsRef = child(roomRef, "teams");

export default function useRoom() {
  const [room, setRoom] = useAtom(roomAtom);

  const { userId } = useUser();

  useTimer();

  useEffect(() => {
    subscribeToRoom();
  }, []);

  function subscribeToRoom() {
    onValue(roomRef, (snapshot) => {
      const room = snapshot.val() as Room;
      setRoom(room);
    });
  }

  useEffect(() => {
    if (room && userId) {
      for (const team of room.teams) {
        for (const member of Object.values(team.members || {})) {
          if (member.id === userId) {
            return () => {};
          }
        }
      }
      const username = prompt("Enter your username");
      const user = { name: username ? username : "Bitch", id: userId };
      addUser(user);
    }
  }, [room, userId]);

  useEffect(() => {
    if (userId) {
      const myHostQueueRef = child(roomRef, `hostQueue/${+new Date()}`);
      set(myHostQueueRef, userId);
      onDisconnect(myHostQueueRef).remove();
    }
  }, [userId]);

  function addUser(user: User) {
    const teamIndex = getSmallestTeamIndex();

    const memberRef = child(teamsRef, `${teamIndex.toString()}/members/${+new Date()}`);

    update(memberRef, user);
    onDisconnect(memberRef).remove();
  }

  function getSmallestTeamIndex() {
    const firstLength = Object.keys(room!.teams[0].members ?? {}).length ?? 0;
    const secondLength = Object.keys(room!.teams[1].members ?? {}).length ?? 0;
    return firstLength > secondLength ? 1 : 0;
  }

  return { room };
}
