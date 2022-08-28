import { createSlice } from "@reduxjs/toolkit";

const generatedCodeReducer = createSlice({
    name: "generatedCode",
    initialState: ``,
    reducers: {
        setGeneratedCode: (state, action) => {
            return action.payload;
        },
    },
});

export const selectGeneratedCode = (state) => state.generatedCode;
export const { setGeneratedCode } = generatedCodeReducer.actions;
export default generatedCodeReducer.reducer;
