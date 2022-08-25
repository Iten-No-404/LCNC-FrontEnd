import { createSlice } from '@reduxjs/toolkit'

const defaultCSSReducer = createSlice({
    name: 'defaultCSS',
    initialState:[],
    reducers: {        
        setDefaultCSS: (state, action) => {
            state = action.payload;            
        }
    }
})

export const { setDefaultCSS } = defaultCSSReducer.actions;
export default defaultCSSReducer.reducer;