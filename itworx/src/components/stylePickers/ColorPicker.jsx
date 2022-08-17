import React , { useState } from "react";
import rgbHex from "rgb-hex";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';
import { setTextColor, selectWidgetCSS } from "../../states/WidgetCSSSlice/WidgetCSSSlice";

export default function ColorPickerTool(colorType) {
    const dispatch = useDispatch();
    const CSS = useSelector(selectWidgetCSS);
    const [activeColor, setActiveColor] = useState("#000");
    useEffect(() => {
        if(CSS.id != null)
        {
            console.log('Change font color to: ',CSS.color);
            setActiveColor(CSS.color);
        }
    }, [CSS.id]);
        return (
            <div
            style={{ marginTop: "55px"}}
            >
                <ChromePicker
                color={activeColor}
                onChange={(nextColor, event) =>
                    {
                        setActiveColor("#" + rgbHex(nextColor.rgb.r, nextColor.rgb.g, nextColor.rgb.b, nextColor.rgb.a));
                        if(colorType.colorType === "textColor")
                            dispatch(setTextColor("#" + rgbHex(nextColor.rgb.r, nextColor.rgb.g, nextColor.rgb.b, nextColor.rgb.a)));
                    }
                }
                />
            </div>
        );
}