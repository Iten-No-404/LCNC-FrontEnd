import { createSlice } from '@reduxjs/toolkit'

const widgetCSS = createSlice({
  name: 'widgetCSS',
  initialState: {
      font: {
        family: "Open Sans",
        size: "medium",
        sizeUnit: "px",
        style: "normal",
        weight: "normal"
      }, 
      text: {
        content: " ",
        color: "black"
      },
      //separate into another slice
      widgetsList: { 
        empty: true
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
      s.text.color = action.payload;
    },
    setWidget: (state, action) => {
      const s = state;
      s.widgetsList.empty = false;
      s.widgetsList[action.payload.id] = {
        font: action.payload.font,
        text: action.payload.text
      };
    },
  }
})

export const selectWidgetCSS = (state) => state.widgetCSS;
export const selectWidgetCSSFont = (state) => state.widgetCSS.font;
export const selectWidgetsList = (state) => state.widgetCSS.widgetsList;
export const { setFontFamily, setFont, setTextColor, setWidget } = widgetCSS.actions;
export default widgetCSS.reducer;
