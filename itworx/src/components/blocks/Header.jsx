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
              fontFamily: CSS.font.family, color: CSS.color,
              fontSize: CSS.font.size+"px"}}
    >
      <div className='p-5 text-center bg-light'>
              {(logo || CSS.text.content==="")?text:CSS.text.content}
      </div>
    </header>
  );
}