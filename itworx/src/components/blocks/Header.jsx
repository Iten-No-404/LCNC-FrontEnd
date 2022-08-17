import React from "react";
import { useDrag } from "react-dnd";
import { defaultFont } from "../../helper/InitialFont";

export default function Header({text, id, classN, font= '', logo=false, isDragging=false}) {
    if(logo)
      font = defaultFont;

  return (
    <header
    className={classN}
    style={{ border: isDragging ? "5px solid pink" : "0px",
             fontFamily: font.family,
   }}
    >
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>{text}</h1>
      </div>
    </header>
  );
}
