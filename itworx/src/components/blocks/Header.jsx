import React from "react";
import { useDrag } from "react-dnd";
import { defaultCSS } from "../../helper/InitialCSS";

export default function Header({text, id, classN, CSS, logo=false}) {
  if(logo)
    CSS = defaultCSS;
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
    style={{ border: isDragging ? "5px solid pink" : "0px",
             fontFamily: CSS.font.family, color: CSS.color
   }}
    >
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>{text}</h1>
      </div>
    </header>
  );
}
