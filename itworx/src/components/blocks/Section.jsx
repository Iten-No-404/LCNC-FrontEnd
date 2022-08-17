import React from "react";
import { useDrag } from "react-dnd";
import { defaultFont } from "../../helper/InitialFont";

export default function Section({text, id, classN, font='', logo=false, isDragging=false}) {
  if(logo)
    font = defaultFont;

  return (
    <section
    className={classN}
    style={{ border: isDragging ? "5px solid pink" : "0px",
    fontFamily: font.family,
    }}
    >
      <div className='p-5 text-center bg-light'>
        {text}
      </div>
    </section>
  );
}
