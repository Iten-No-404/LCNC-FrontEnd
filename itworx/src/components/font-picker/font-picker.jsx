import React  from "react";
import { useDispatch } from 'react-redux';
import FontPicker from "font-picker-react";
import { setFontFamily } from "../../states//widget-css-slice//widget-css-slice";
/**
 * Manage the user to select font type for the  selected widget
 */
export default function FontPickerTool({setActiveFontFamily,activeFontFamily}) {
    const dispatch = useDispatch();
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