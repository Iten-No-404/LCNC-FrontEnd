import React from "react";
import { useDrag } from "react-dnd";
import { defaultFont, defaultCSS } from "../../helper/InitialCSS";

export default function Section({text, id, classN, font, CSS, logo=false}) {
  if(logo)
  {
    font = defaultFont;
    CSS = defaultCSS;
  }
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
    style={{ border: isDragging ? "5px solid pink" : "0px",
    fontFamily: font.family,
    color: CSS.text.color,
    }}
    >
      <div className='p-5 text-center bg-light'>
        {text}
      </div>
    </section>
  );
}
