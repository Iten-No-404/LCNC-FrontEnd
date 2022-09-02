import { createSlice } from "@reduxjs/toolkit";

const generatedCodeReducer = createSlice({
    name: "generatedCode",
    initialState: ``,
    reducers: {
        /**
         * This function sets the values the gentrated code HTML and CSS
         * @method
         * @param {object} state The object that stores the current board code
         * @param {object} action The object containing the new board generated code
         */
        setGeneratedCode: (state, action) => {
            return action.payload;
        },
    },
});

export const selectGeneratedCode = (state) => state.generatedCode;
export const { setGeneratedCode } = generatedCodeReducer.actions;
export default generatedCodeReducer.reducer;
