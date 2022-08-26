import { createSlice } from '@reduxjs/toolkit'

const widgetList = createSlice({
    name: 'widgetList',
    initialState: {
        widgetsList: { 
        empty: true
        }
    },
    reducers: {
        /**
         * This function adds/updates the properties of a widget using its ID.
         * @method
         * @param {object} state The object that stores the current widgets in a dictionary.
         * @param {object} action The object containing the new Widget properties and its ID.
         */
        setWidget: (state, action) => {
            const s = state;
            s.widgetsList.empty = false;
            s.widgetsList[action.payload.id] = {
                color: action.payload.CSS.color,
                font: action.payload.CSS.font,
                text: action.payload.CSS.text,
                background: action.payload.CSS.background,
                width: action.payload.CSS.width,
                height: action.payload.CSS.height,
                padding: action.payload.CSS.padding,
                margin: action.payload.CSS.margin,
                border: action.payload.CSS.border,
            };
        },
        /**
         * This function empties the widget list.
         * @method
         * @param {object} state The object that stores the current widgets in a dictionary.
         */
        emptyWidgetsList: (state) => {
            const s = state;
            s.widgetsList = { empty: true };
        }
    }
})

export const selectWidgetsList = (state) => state.widgetList.widgetsList;
export const { setWidget, emptyWidgetsList } = widgetList.actions;
export default widgetList.reducer;