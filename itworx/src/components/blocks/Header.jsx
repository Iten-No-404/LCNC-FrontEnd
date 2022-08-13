import React from "react";
import { defaultCSS } from "../../helper/InitialCSS";

export default function Header({text, id, classN, font= '', CSS, logo=false, isDragging=false}) {
    if(logo)
    {
      CSS = defaultCSS;
      font = defaultCSS.font;
    }
  
  return (
    <header
    className={classN}
    style={{ border: isDragging ? "5px solid pink" : "0px",
             fontFamily: CSS.font.family, color: CSS.color
   }}
    >
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>{(logo || CSS.text.content==="")?text:CSS.text.content}</h1>
      </div>
    </header>
  );
}
