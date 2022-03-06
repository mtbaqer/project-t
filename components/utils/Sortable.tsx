import { Data } from "@dnd-kit/core/dist/store";
import { useSortable } from "@dnd-kit/sortable";
import React, { CSSProperties, FunctionComponent } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useAtomValue } from "jotai/utils";
import { activeDraggableAtom } from "../../atoms/activeDraggable";

interface Props {
  id: string;
}

const Sortable: FunctionComponent<Props> = ({ children, id }) => {
  const activeDraggable = useAtomValue(activeDraggableAtom);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: activeDraggable === id ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default Sortable;
