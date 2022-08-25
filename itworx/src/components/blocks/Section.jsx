import React from "react";
import { defaultCSS } from "../../helper/InitialCSS";

export default function Section({text, id, classN, font='', CSS, logo=false, isDragging=false}) {
  if(logo)
  {
    CSS = defaultCSS;
    font = defaultCSS.font;
  }
  return (
    <section
    className={classN}
    style={{ border: isDragging ? "5px solid pink" : "0px",
    fontFamily: CSS.font.family,
    color: CSS.color,
    fontSize: CSS.font.size+"px",
    backgroundColor: CSS.background.color
    }}
    >
      <div className='p-5 text-center'>
        {(logo || CSS.text.content==="")?text:CSS.text.content}
      </div>
    </section>
  );
}