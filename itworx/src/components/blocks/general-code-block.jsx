import React from "react";
import { useSelector } from "react-redux";
import { selectDefaultCSS } from "../../states/default-css-slice/default-css-slice";
import parse from 'html-react-parser';

export default function GeneralCodeBlock({ classN, text, CSS=null, isDragging = false, code1, code2 }) {
    const defaultCSS = useSelector(selectDefaultCSS);
    console.log(CSS);
    if (!CSS) {
        CSS = defaultCSS;
    }

    const styling = {
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
    return parse(codeText);    
}