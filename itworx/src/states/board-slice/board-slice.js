import { createSlice } from '@reduxjs/toolkit'

const boardReducer = createSlice({
    name: "board",
    initialState: [],
    reducers: {
        /**
         * This function sets the values the board
         * @method
         * @param {object} state The object that stores the current board
         * @param {object} action The object containing the new board
         */
        setBoard: (state, action) => {
            state = action.payload;
        },
    },
});

export const { setBoard } = boardReducer.actions;
export default boardReducer.reducer;