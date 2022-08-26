import { createSlice } from '@reduxjs/toolkit'

const defaultCSS = createSlice({
    name: 'defaultCSS',
    initialState:{},
    reducers: {        
        setDefaultCSS: (state, action) => {
            return action.payload; 
        }
    }
})

export const selectDefaultCSS = (state) => state.defaultCSS;
export const { setDefaultCSS } = defaultCSS.actions;
export default defaultCSS.reducer;