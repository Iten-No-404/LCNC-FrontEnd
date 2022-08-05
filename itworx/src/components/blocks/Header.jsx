import React from "react";
import { useDrag } from "react-dnd";
import { defaultFont, defaultCSS } from "../../helper/InitialCSS";

export default function Header({text, id, classN, font, CSS, logo=false}) {
  if(logo)
  {
    font = defaultFont;
    CSS = defaultCSS;
  }
  console.log(CSS.text.color);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "block",
        item: { id: id },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
    }));
  console.log(CSS.text.color);
  return (
    <header
    className={classN}
    ref={drag}
    style={{ border: isDragging ? "5px solid pink" : "0px",
             fontFamily: font.family, color: CSS.text.color
   }}
    >
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>{text}</h1>
      </div>
    </header>
  );
}
