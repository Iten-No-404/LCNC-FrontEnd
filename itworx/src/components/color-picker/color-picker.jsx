import React , { useState } from "react";
import { PropTypes, string } from "prop-types";
import rgbHex from "rgb-hex";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';
import { setTextColor, setBackgroundColor ,selectWidgetCSS } from "../../states/widget-css-slice/widget-css-slice";

/**
 * This is Color Picker Tool mange the user to pick the color of the text or for background depend on the props colorType
 */

export default function ColorPickerTool({colorType}) {
    const dispatch = useDispatch();
    const CSS = useSelector(selectWidgetCSS);
    const [activeColor, setActiveColor] = useState("#000");
    useEffect(() => {
        if(CSS.id != null)
        {
            if(colorType === "textColor")
                setActiveColor(CSS.color);
            else if(colorType === "backgroundColor")
                setActiveColor(CSS.background.color);
            
        }
    }, [CSS.id]);
        return (
            <div
            style={{ marginTop: "20px"}}
            >
                <ChromePicker
                color={activeColor}
                onChange={(nextColor, event) =>
                    {
                        setActiveColor("#" + rgbHex(nextColor.rgb.r, nextColor.rgb.g, nextColor.rgb.b, nextColor.rgb.a));
                        if(colorType === "textColor")
                            dispatch(setTextColor("#" + rgbHex(nextColor.rgb.r, nextColor.rgb.g, nextColor.rgb.b, nextColor.rgb.a)));
                        else if(colorType === "backgroundColor")
                            dispatch(setBackgroundColor("#" + rgbHex(nextColor.rgb.r, nextColor.rgb.g, nextColor.rgb.b, nextColor.rgb.a)));    
                    }
                }
                />
            </div>
        );
}
ColorPickerTool.propTypes = {
    /** determin is the color picked for font color of for the background */
    colorType: PropTypes.string.isRequired,
}