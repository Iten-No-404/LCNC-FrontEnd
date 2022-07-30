import React from "react";
import { useDrag } from "react-dnd";

export default function Header({text, id, classN}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "block",
        item: { id: id },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
    }));

  return (
    <header
    className={classN}
    ref={drag}
    style={{ border: isDragging ? "5px solid pink" : "0px" }}
    >
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>{text}</h1>
      </div>
    </header>
  );
}
