import React from "react";
import { useSelector } from "react-redux";
import { selectDefaultCSS } from "../../states/default-css-slice/default-css-slice";
import parse from 'html-react-parser';

export default function GeneralCodeBlock({ text, id, classN, font = '', CSS, logo = false, isDragging = false, code1, code2 }) {
    const defaultCSS = useSelector(selectDefaultCSS);

    if (logo) {
        CSS = defaultCSS;
        font = defaultCSS.font;
    }

    const styling = {
        "border": isDragging ? "5px solid pink" : "0px",
        "font-family": CSS.font.family,
        "color": CSS.color,
        "font-size": CSS.font.size + "px",
        "background-color": CSS.background.color,
        "width": `${CSS.width}%`,
        "height": `${CSS.height}px`,
        "padding": `${CSS.padding}px`,
        "margin": `${CSS.margin}px`,
        "border-radius": `${CSS.border.radius}%`,
    };
    let stringStyles = ''

    Object.entries(styling).map(([key, value]) => {
        // console.log(key)
        stringStyles += key + ':' + value + '; '
    })

    let codeText = '';
    const splitforid = code1.split("id");
    const opentag = `${splitforid[0]} style="${stringStyles}"  ${splitforid[1]}`;
    codeText = codeText.concat(
        opentag +
        (CSS.text.content ? CSS.text.content : text) +
        code2
    );
    // console.log(codeText)
    return parse(codeText);    
}