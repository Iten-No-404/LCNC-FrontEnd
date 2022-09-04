import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice/user-slice';

const store = configureStore({
    /**
     * configure the store with all needed slices
     */
    reducer: {
        user: userReducer
    },
});

export default store;