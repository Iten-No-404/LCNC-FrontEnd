import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../apis/globalapi.js';
import axios from 'axios';

const headers = {
  // Accept: 'application/json',
  // 'Transfer-Encoding': 'chunked',
  'Content-Type': 'application/json'
};

export const getUserThunk = createAsyncThunk(
    'getUser',
    async (query) => fetch(`${process.env.REACT_APP_BASE_URL}/User/${query}`, {
      method: 'GET',
      // headers: {
      //   ...headers
      // },
      // body: JSON.stringify(query),
    }).then((res) => res.json()),
  );

  export const logInThunk = createAsyncThunk(
    'login',
    async (query) => fetch(`${process.env.REACT_APP_BASE_URL}/User/Login`, {
      crossDomain:true,
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(query),
    }).then((res) => res.json()),
  );

const user = createSlice({
    name: 'user',
    initialState: {
        user: {
            fullName: "User 1",
            email: "iten_emad@yahoo.com",
            phoneNo: 0,
            password: "",
            subscriptionDate: "0000-00-00T00:00:00",
            isEmailConfirmed: false,
            isActive: false,
            project: null,
            id: null,
            addedData: "0000-00-00T00:00:00",
            modifiedTime: "0000-00-00T00:00:00"
        }
        // ex:
        // {
        //     "fullName": "Iten",
        //     "email": "iten_emad@yahoo.com",
        //     "phoneNo": 1124988295,
        //     "password": "qwerty123",
        //     "subscriptionDate": "2020-12-12T00:00:00",
        //     "isEmailConfirmed": true,
        //     "isActive": true,
        //     "project": null,
        //     "id": 5,
        //     "addedData": "2020-12-12T00:00:00",
        //     "modifiedTime": "2020-12-12T00:00:00"
        // }
    },
    reducers: {
        /**
         * This function adds/updates the user's data.
         * @method
         * @param {object} state The object that stores the current user's data.
         * @param {object} action The object containing the new user's data.
         */
        setUser: (state, action) => {
            const s = state;
            s.user = action.payload
        },
        /**
         * This function empties the user data.
         * @method
         * @param {object} state The object that stores the current user data.
         */
        logOut: (state) => {
            const s = state;
            s.user = {
                fullName: "",
                email: "",
                phoneNo: 0,
                password: "",
                subscriptionDate: "0000-00-00T00:00:00",
                isEmailConfirmed: false,
                isActive: false,
                project: null,
                id: null,
                addedData: "0000-00-00T00:00:00",
                modifiedTime: "0000-00-00T00:00:00"
            };
        }
    },
    extraReducers: {
        [getUserThunk.pending]: () => {
        },
        [getUserThunk.fulfilled]: (state, { payload }) => {
          console.log('Get User Payload:',payload);
          state.user = payload;
          // localStorage.setItem('user', JSON.stringify(state.user));
          // window.location.replace('/dashboard');
        },
        [getUserThunk.rejected]: () => {
        },
        [logInThunk.pending]: () => {
          console.log('Login in Progress');
        },
        [logInThunk.fulfilled]: (state, { payload }) => {
          console.log('Login Payload:',payload);
          state.user = payload;
        },
        [logInThunk.rejected]: () => {
          console.log('Login in Failed!!!!');
        },
    }
})

export const selectUser = (state) => state.user.user;
export const { setUser, logOut } = user.actions;
export default user.reducer;
