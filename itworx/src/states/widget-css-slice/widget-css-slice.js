import { createSlice } from '@reduxjs/toolkit'

const widgetCSS = createSlice({
    name: "widgetCSS",
    initialState: {
        id: null,
        color: "black",
        font: {
            family: "Open Sans",
            size: 25,
            // sizeUnit: "px",
            // style: "normal",
            // weight: "normal"
        },
        text: {
            content: "",
        },
        background: {
            color: "black",
        },
        width: "98",
        height: "100",
    },
    reducers: {
        /**
         * This function sets the values of all the Widget's CSS
         * @method
         * @param {object} state The object that stores the current values of all the Widget's CSS
         * @param {object} action The object containing the new values of all the Widget's CSS
         */
        setCSS: (state, action) => {
            const s = state;
            s.color = action.payload.color;
            s.font = action.payload.font;
            s.text = action.payload.text;
            s.background = action.payload.background;
            s.id = action.payload.id;
        },
        /**
         * This function sets the value of the Widget's Font Family
         * @method
         * @param {object} state The object that stores the current Widget's Font Family value
         * @param {object} action The object containing the new Widget's Font Family value
         */
        setFontFamily: (state, action) => {
            const s = state;
            s.font.family = action.payload;
        },
        /**
         * This function sets the values of the Widget's Font
         * @method
         * @param {object} state The object that stores the current Widget's Font values
         * @param {object} action The object containing the new Widget's Font values
         */
        setFont: (state, action) => {
            const s = state;
            s.font = action.payload;
        },
        /**
         * This function sets the values of the text's content value
         * @method
         * @param {object} state The object that stores the current Widget's text content value
         * @param {object} action The object containing the new Widget's text content value
         */
        setTextContent: (state, action) => {
            const s = state;
            s.text.content = action.payload;
        },
        /**
         * This function sets the values of the text's color
         * @method
         * @param {object} state The object that stores the current Widget's text's color value
         * @param {object} action The object containing the new Widget's text's color value
         */
        setTextColor: (state, action) => {
            const s = state;
            s.color = action.payload;
        },
        /**
         * This function sets the values of the text's size
         * @method
         * @param {object} state The object that stores the current Widget's text's size value
         * @param {object} action The object containing the new Widget's text's size value
         */
        setFontsizeval: (state, action) => {
            const s = state;
            s.font.size = action.payload;
        },
        /**
         * This function sets the values of the text's size
         * @method
         * @param {object} state The object that stores the current Widget's background color
         * @param {object} action The object containing the new Widget's background color
         */
        setBackgroundColor: (state, action) => {
            const s = state;
            s.background.color = action.payload;
        },
        setWidthval: (state, action) => {
            const s = state;
            s.width = action.payload;
        },
        setHeightval: (state, action) => {
            const s = state;
            s.height = action.payload;
        },
    },
});

export const selectWidgetCSS = (state) => state.widgetCSS;
export const { setCSS, setFontFamily, setFont, setTextColor, setBackgroundColor, setTextContent, setFontsizeval, setWidthval, setHeightval } =
    widgetCSS.actions;
export default widgetCSS.reducer;