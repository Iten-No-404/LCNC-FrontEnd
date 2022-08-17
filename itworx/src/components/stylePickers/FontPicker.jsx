import React , { useState } from "react";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPicker from "font-picker-react";
import { setFontFamily, selectWidgetCSS } from "../../states/WidgetCSSSlice/WidgetCSSSlice";

export default function FontPickerTool() {
        const dispatch = useDispatch();
        const CSS = useSelector(selectWidgetCSS);
        const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
        useEffect(() => {
            if(CSS.id != null)
            {
                console.log('Change font family to: ',CSS.font.family);
                setActiveFontFamily(CSS.font.family);
            }
        }, [CSS.id]);
        return (
            <div
            style={{ marginTop: "10px", marginBottom: "10px", alignContent: "center" }}
            >
                <FontPicker
                    apiKey="AIzaSyCPcfk138hzU-ViguuofBsbJRhaqX_2D0M"
                    // apiKey={process.env.FONT_KEY}
                    activeFontFamily={activeFontFamily}
                    onChange={(nextFont) =>
                        {
                            setActiveFontFamily(nextFont.family);
                            dispatch(setFontFamily(nextFont.family));
                        }
                    }
                />
            </div>
        );
}