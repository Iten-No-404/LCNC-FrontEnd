import React from "react";
import { useSelector } from "react-redux";
import { selectDefaultCSS } from "../../states/default-css-slice/default-css-slice";
import parse from 'html-react-parser';
import { PropTypes } from "prop-types";

/**
 * component to render any widget in the board with its CSS or in the sideTabs to be drag and drop in the board
 */
export default function GeneralCodeBlock({ classN, text, CSS=null, isDragging = false, code1, code2 }) {
    const defaultCSS = useSelector(selectDefaultCSS);
    if (!CSS) {
        CSS = defaultCSS;
    }

    const styling = {
        "font-family": CSS.font.family,
        "color": CSS.color,
        "font-size": CSS.font.size + "px",
        "background-color": CSS.background.color,
        "width": `${CSS.width}%`,
        "height": `${CSS.height}%`,
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
    return <div className={classN} style={{"border": isDragging ? "5px solid pink" : "0px"}}>{parse(codeText)}</div>
}

GeneralCodeBlock.propTypes = {
    /** to give different style for the block in board or in the Tabs */
    classN: PropTypes.string.isRequired,
    /** to determent the style of the block */
    CSS: PropTypes.shape({
        font:PropTypes.shape({
            family:PropTypes.string,
            size:PropTypes.string,
        }),
        width:PropTypes.string,
        height:PropTypes.string,
        padding:PropTypes.string,
        margin:PropTypes.string,
        border:PropTypes.shape({
            radius:PropTypes.string
        }),
    }),
    /** bool to check if the block is dragging to give it boarder */
    isDragging: PropTypes.bool,
    /** to give different style for the block in board or in the Tabs */
    code1: PropTypes.string.isRequired,
    code2: PropTypes.string.isRequired,
}