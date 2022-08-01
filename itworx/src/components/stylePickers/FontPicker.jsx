import React , { useState } from "react";
import { useDispatch } from 'react-redux';
import FontPicker from "font-picker-react";
// import { selectWidgetCSSFont } from '../../states/WidgetCSSSlice/WidgetCSSSlice';
import { setFontFamily } from "../../states/WidgetCSSSlice/WidgetCSSSlice";

export default function FontPickerTool() {
        const dispatch = useDispatch();
        // const font = useSelector(selectWidgetCSSFont);
        const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
        return (
            <div>
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
                <p className="apply-font">The font will be applied to this text.</p>
            </div>
        );
}