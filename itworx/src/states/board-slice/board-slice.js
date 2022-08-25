import { createSlice } from '@reduxjs/toolkit'

const boardReducer = createSlice({
    name: 'board',
    initialState:[],
    reducers: {        
        setBoard: (state, action) => {
            state = action.payload;            
        }
    }
})

export const { setBoard } = boardReducer.actions;
export default boardReducer.reducer;