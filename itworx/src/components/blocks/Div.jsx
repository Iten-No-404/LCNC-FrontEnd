import React from "react";
import { defaultCSS } from "../../helper/InitialCSS";

export default function Div({text, id, classN, font= '', CSS, logo=false, isDragging=false}) {
    if(logo)
    {
      CSS = defaultCSS;
      font = defaultCSS.font;
    }
  
  return (
    <div
    className={classN}
    style={{ border: isDragging ? "5px solid pink" : "0px",
             fontFamily: CSS.font.family, color: CSS.color
   }}
    >
      {(logo || CSS.text.content==="")?text:CSS.text.content}
    </div>
  );
}