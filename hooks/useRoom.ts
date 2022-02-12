import { useEffect } from "react";
import { Room, RoomStatus, User } from "../types/types";
import { child, getDatabase, onDisconnect, onValue, ref, set, update } from "firebase/database";
import useUser from "./useUser";
import useTimer from "./useTimer";
import { useAtom } from "jotai";
import { roomAtom } from "../atoms/room";
import { useRouter } from "next/router";

const database = getDatabase();

export default function useRoom() {
  useTimer();

  const [room, setRoom] = useAtom(roomAtom);

  const router = useRouter();
  const { roomId } = router.query;

  const { userId } = useUser();

  const roomRef = ref(database, `rooms/${roomId}`);
  const teamsRef = child(roomRef, "teams");

  useEffect(() => {
    if (roomId) subscribeToRoom();
  }, [roomId]);

  function subscribeToRoom() {
    onValue(roomRef, (snapshot) => {
      if (!snapshot.exists()) router.push("/");
      else {
        const room = snapshot.val() as Room;
        setRoom(room);
      }
    });
  }

  useEffect(() => {
    if (room.id !== "default" && userId) {
      for (const team of room.teams) {
        for (const member of Object.values(team.members || {})) {
          if (member.id === userId) {
            return () => {};
          }
        }
      }
      const username = prompt("Enter your username");
      const user = { name: username ? username : "Filled", id: userId };
      addUser(user);
    }
  }, [room, userId]);

  function addUser(user: User) {
    addToHostQueue();

    const teamIndex = getSmallestTeamIndex();

    const memberRef = child(teamsRef, `${teamIndex.toString()}/members/${+new Date()}`);

    update(memberRef, user);
    onDisconnect(memberRef).remove();
  }

  function addToHostQueue() {
    if (isFirstPlayerToJoin()) {
      const status: RoomStatus = "waiting";
      update(roomRef, { status });
    }
    const myHostQueueRef = child(roomRef, `hostQueue/${+new Date()}`);
    set(myHostQueueRef, userId);
    onDisconnect(myHostQueueRef).remove();
  }

  function isFirstPlayerToJoin() {
    return !room.hostQueue;
  }

  function getSmallestTeamIndex() {
    const firstLength = Object.keys(room!.teams[0].members ?? {}).length ?? 0;
    const secondLength = Object.keys(room!.teams[1].members ?? {}).length ?? 0;
    return firstLength > secondLength ? 1 : 0;
  }

  return { room };
}
