import { useSortable } from "@dnd-kit/sortable";
import React, { CSSProperties, FunctionComponent } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useAtomValue } from "jotai/utils";
import { roomStatusAtom } from "../../atoms/room";
import { userAtom } from "../../atoms/user";

interface Props {
  id: string;
}

const Sortable: FunctionComponent<Props> = ({ children, id }) => {
  const { timestamp } = useAtomValue(userAtom)!;
  const roomStatus = useAtomValue(roomStatusAtom);
  const disabled = roomStatus !== "lobby" && timestamp !== id;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default Sortable;
