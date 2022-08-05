import { createSlice } from '@reduxjs/toolkit'

const widgetCSS = createSlice({
  name: 'widgetCSS',
  initialState: {
    color: "black",
    font: {
      family: "Open Sans",
      size: "medium",
      sizeUnit: "px",
      style: "normal",
      weight: "normal"
    }, 
    text: {
      content: " "
    }
    },
  reducers: {
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
     * This function sets the values of the text's color
     * @method
     * @param {object} state The object that stores the current Widget's text's color value
     * @param {object} action The object containing the new Widget's text's color value
     */
    setTextColor: (state, action) => {
      const s = state;
      s.color = action.payload;
    }
  }
})

export const selectWidgetCSS = (state) => state.widgetCSS;
export const selectWidgetCSSFont = (state) => state.widgetCSS.font;
export const { setFontFamily, setFont, setTextColor} = widgetCSS.actions;
export default widgetCSS.reducer;
