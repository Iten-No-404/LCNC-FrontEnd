import React from "react";
import { useSelector } from "react-redux";
import { selectDefaultCSS } from "../../states/default-css-slice/default-css-slice";

export default function Header({ text, id, classN, font = '', CSS, logo = false, isDragging = false }) {
  const defaultCSS = useSelector(selectDefaultCSS);

  if (logo) {
    CSS = defaultCSS;
    font = defaultCSS.font;
  }

  return (
    <header
      className={classN}
      style={{
        border: isDragging ? "5px solid pink" : "0px",
        fontFamily: CSS.font.family, color: CSS.color,
        fontSize: CSS.font.size + "px",
        backgroundColor: CSS.background.color,
        width: `${CSS.width}%`,
        height: `${CSS.height}px`,
        padding: `${CSS.padding}px`,
        margin: `${CSS.margin}px`
      }}
    >
      <div className='p-5 text-center'>
        {(logo || CSS.text.content === "") ? text : CSS.text.content}
      </div>
    </header>
  );
}