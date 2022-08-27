import React , { useState } from "react";
import rgbHex from "rgb-hex";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';
import { setTextColor, setBackgroundColor ,selectWidgetCSS } from "../../states/widget-css-slice/widget-css-slice";

export default function ColorPickerTool(colorType) {
    const dispatch = useDispatch();
    const CSS = useSelector(selectWidgetCSS);
    const [activeColor, setActiveColor] = useState("#000");
    useEffect(() => {
        if(CSS.id != null)
        {
            if(colorType.colorType === "textColor")
                setActiveColor(CSS.color);
            else if(colorType.colorType === "backgroundColor")
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
                        if(colorType.colorType === "textColor")
                            dispatch(setTextColor("#" + rgbHex(nextColor.rgb.r, nextColor.rgb.g, nextColor.rgb.b, nextColor.rgb.a)));
                        else if(colorType.colorType === "backgroundColor")
                            dispatch(setBackgroundColor("#" + rgbHex(nextColor.rgb.r, nextColor.rgb.g, nextColor.rgb.b, nextColor.rgb.a)));    
                    }
                }
                />
            </div>
        );
}