import React from "react";
import { useDrag } from "react-dnd";

export default function Section({text, id, classN}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "block",
        item: { id: id },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
    }));

  return (
    <section
    className={classN}
    ref={drag}
    style={{ border: isDragging ? "5px solid pink" : "0px" }}
    >
      <div className='p-5 text-center bg-light'>
        {text}
      </div>
    </section>
  );
}
