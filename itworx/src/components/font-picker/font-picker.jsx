import React , { useState } from "react";
import { useDispatch } from 'react-redux';
import FontPicker from "font-picker-react";
import { setFontFamily } from "../../states//widget-css-slice//widget-css-slice";

export default function FontPickerTool() {
        const dispatch = useDispatch();
        const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
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