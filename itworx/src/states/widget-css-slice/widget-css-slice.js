import { createSlice } from '@reduxjs/toolkit'

const widgetCSS = createSlice({
    name: "widgetCSS",
    initialState: {
        id: null,
        color: "#000000FF",
        font: {
            family: "Open Sans",
            size: 25,
        },
        text: {
            content: "",
        },
        background: {
            color: "#000000FF",
        },
        border: {
            radius: "0",
        },
        width: "100",
        height: "100",
        padding: "0",
        margin: "0",
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
            s.width = action.payload.width;
            s.height = action.payload.height;
            s.padding = action.payload.padding;
            s.margin = action.payload.margin;
            s.border = action.payload.border;
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
         * This function sets the values of the widget background color
         * @method
         * @param {object} state The object that stores the current Widget's background color
         * @param {object} action The object containing the new Widget's background color
         */
        setBackgroundColor: (state, action) => {
            const s = state;
            s.background.color = action.payload;
        },
        /**
         * This function sets the values of the widget width
         * @method
         * @param {object} state The object that stores the current Widget's width
         * @param {object} action The object containing the new Widget's width
         */
        setWidthval: (state, action) => {
            const s = state;
            s.width = action.payload;
        },
        /**
         * This function sets the values of the widget height
         * @method
         * @param {object} state The object that stores the current Widget's height
         * @param {object} action The object containing the new Widget's height
         */
        setHeightval: (state, action) => {
            const s = state;
            s.height = action.payload;
        },
        /**
         * This function sets the values of the widget padding
         * @method
         * @param {object} state The object that stores the current Widget's padding
         * @param {object} action The object containing the new Widget's padding
         */
        setPaddingval: (state, action) => {
            const s = state;
            s.padding = action.payload;
        },
         /**
         * This function sets the values of the widget margin
         * @method
         * @param {object} state The object that stores the current Widget's margin
         * @param {object} action The object containing the new Widget's margin
         */
        setMarginval: (state, action) => {
            const s = state;
            s.margin = action.payload;
        },
         /**
         * This function sets the values of the widget boarder redius
         * @method
         * @param {object} state The object that stores the current Widget's border redius
         * @param {object} action The object containing the new Widget's boarder redius
         */
        setBoarderrediusval: (state, action) => {
            const s = state;
            s.border.radius = action.payload;
        },
    },
});

export const selectWidgetCSS = (state) => state.widgetCSS;
export const {
    setCSS,
    setFontFamily,
    setFont,
    setTextColor,
    setBackgroundColor,
    setTextContent,
    setFontsizeval,
    setWidthval,
    setHeightval,
    setPaddingval,
    setMarginval,
    setBoarderrediusval,
} = widgetCSS.actions;
export default widgetCSS.reducer;