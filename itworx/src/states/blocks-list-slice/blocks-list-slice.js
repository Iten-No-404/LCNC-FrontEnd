import { createSlice } from '@reduxjs/toolkit'

const blocksListReducer = createSlice({
    name: 'blocksList',
    initialState:[],
    reducers: {        
        setBlocksList: (state, action) => {
            return action.payload;
        }
    }
})

export const selectBlocksList = (state) => state.blocksList;
export const { setBlocksList } = blocksListReducer.actions;
export default blocksListReducer.reducer;