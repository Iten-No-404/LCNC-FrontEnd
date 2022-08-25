import { createSlice } from '@reduxjs/toolkit'

const blocksListReducer = createSlice({
    name: 'blocksList',
    initialState:[],
    reducers: {        
        setBlocksList: (state, action) => {
            state = action.payload;            
        }
    }
})

export const { setBlocksList } = blocksListReducer.actions;
export default blocksListReducer.reducer;