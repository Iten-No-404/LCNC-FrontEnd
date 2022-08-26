import React from "react";
import { useSelector } from "react-redux";
import { selectDefaultCSS } from "../../states/default-css-slice/default-css-slice";

export default function Div({ text, id, classN, font = '', CSS, logo = false, isDragging = false }) {
  const defaultCSS = useSelector(selectDefaultCSS);

  if (logo) {
    CSS = defaultCSS;
    font = defaultCSS.font;
  }

  return (
    <div
      className={classN}
      style={{
        border: isDragging ? "5px solid pink" : "0px",
        fontFamily: CSS.font.family, color: CSS.color,
        fontSize: CSS.font.size + "px",
        backgroundColor: CSS.background.color,
        width: `${CSS.width}%`,
        height: `${CSS.height}px`
      }}
    >
      {(logo || CSS.text.content === "") ? text : CSS.text.content}
    </div>
  );
}