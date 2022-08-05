import React from "react";
import { useDrag } from "react-dnd";
import { defaultCSS } from "../../helper/InitialCSS";

export default function Section({text, id, classN, CSS, logo=false}) {
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
    <section
    className={classN}
    ref={drag}
    style={{ border: isDragging ? "5px solid pink" : "0px",
    fontFamily: CSS.font.family,
    color: CSS.color,
    }}
    >
      <div className='p-5 text-center bg-light'>
        {text}
      </div>
    </section>
  );
}
