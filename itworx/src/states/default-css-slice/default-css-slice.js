import { createSlice } from '@reduxjs/toolkit'

const defaultCSS = createSlice({
    name: 'defaultCSS',
    initialState:{},
    reducers: {   
        /**
         * This function sets the values the Default CSS for all widgets
         * @method
         * @param {object} state The object that stores the current Default CSS
         * @param {object} action The object containing the new Default CSS
         */     
        setDefaultCSS: (state, action) => {
            return action.payload; 
        }
    }
})

export const selectDefaultCSS = (state) => state.defaultCSS;
export const { setDefaultCSS } = defaultCSS.actions;
export default defaultCSS.reducer;