import React , { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import FontPicker from "font-picker-react";
import { selectWidgetCSS, setFontFamily } from "../../states//widget-css-slice//widget-css-slice";
/**
 * Manage the user to select font type for the  selected widget
 */
export default function FontPickerTool() {
    const dispatch = useDispatch();
    const CSS = useSelector(selectWidgetCSS);
    const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
    useEffect(() => {
        if(CSS.id != null)
        {   
            setActiveFontFamily(CSS.font.family);
        }
    }, [CSS.id]);
        return (
            <div
            style={{ marginTop: "10px", marginBottom: "10px", alignContent: "center" }}
            >
                <FontPicker
                    apiKey={process.env.REACT_APP_FONT_PICKER_API_KEY}
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