import { createSlice } from '@reduxjs/toolkit'

const blocksListReducer = createSlice({
    name: 'blocksList',
    initialState:[],
    reducers: {
        /**
         * This function sets the values the blocks (widgets) list
         * @method
         * @param {object} state The object that stores the current blocks list
         * @param {object} action The object containing the new blocks list
         */        
        setBlocksList: (state, action) => {
            return action.payload;
        }
    }
})

export const selectBlocksList = (state) => state.blocksList;
export const { setBlocksList } = blocksListReducer.actions;
export default blocksListReducer.reducer;