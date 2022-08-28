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
    async (query) => fetch(`${process.env.REACT_APP_LOCAL_API}/User/${query}`, {
      method: 'GET',
      headers: {
        ...headers
      },
    }).then((res) => res.json()),
  );

  export const logInThunk = createAsyncThunk(
    'login',
    async (query) => fetch(`${process.env.REACT_APP_LOCAL_API}/User/Login`, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: JSON.stringify(query),
    }).then((res) => res.json()),
  );

  export const signUpThunk = createAsyncThunk(
    'signUp',
    async (query) => fetch(`${process.env.REACT_APP_LOCAL_API}/User/Signup`, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: JSON.stringify(query),
    }).then((res) => res.json()),
  );

  export const updateUserThunk = createAsyncThunk(
    'updateUser',
    async (query) => fetch(`${process.env.REACT_APP_LOCAL_API}/User/UpdateUser`, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: JSON.stringify(query),
    }).then((res) => res.json()),
  );
  export const deleteUserThunk = createAsyncThunk(
    'deleteUser',
    async (query) => fetch(`${process.env.REACT_APP_LOCAL_API}/User/DeleteUser`, {
      method: 'DELETE',
      headers: {
        ...headers
      },
      body: JSON.stringify(query),
    }).then((res) => res.json()),
  );

const user = createSlice({
    name: 'user',
    initialState: {
        user: {
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
        },
        status: 'idle'
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
         * This function retrives the user's data from local storage.
         * @method
         * @param {object} state The object that stores the current user's data.
         */
        setUser: (state) => {
            const s = state;
            const loggedInUser = localStorage.getItem('user');
            if (loggedInUser) {
              const foundUser = JSON.parse(loggedInUser);
              s.user = foundUser;
              localStorage.clear();
              localStorage.setItem('user', JSON.stringify(state.user));
            }
            else {
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
            localStorage.clear();
        },
        setStatusToIdle: (state) => {
          const s = state; 
          s.status = 'idle';
        }
      },
      extraReducers: {
        [getUserThunk.pending]: (state) => {
          const s = state; 
          s.status = 'pending';
        },
        [getUserThunk.fulfilled]: (state, { payload }) => {
          const s = state; 
          console.log('Get User Payload:',payload);
          s.user = payload;
          s.status = 'fulfilled';
          localStorage.setItem('user', JSON.stringify(state.user));
          // window.location.replace('/dashboard');
        },
        [getUserThunk.rejected]: (state) => {
          const s = state; 
          s.status = 'rejected';
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
        [signUpThunk.pending]: () => {
          console.log('SignUp in Progress');
        },
        [signUpThunk.fulfilled]: (state, { payload }) => {
          console.log('SignUp Payload:',payload);
          state.user = payload;
          // localStorage.setItem('user', JSON.stringify(state.user));
        },
        [signUpThunk.rejected]: () => {
          console.log('SignUp in Failed!!!!');
        },
        [updateUserThunk.pending]: () => {
          console.log('UpdateUser in Progress');
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
          console.log('UpdateUser Payload:',payload);
          state.user = payload;
        },
        [updateUserThunk.rejected]: () => {
          console.log('UpdateUser in Failed!!!!');
        },
        [deleteUserThunk.pending]: () => {
          console.log('DeleteUser in Progress');
        },
        [deleteUserThunk.fulfilled]: (state, { payload }) => {
          console.log('DeleteUser Payload:',payload);
          state.user = {
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
        },
        [deleteUserThunk.rejected]: () => {
          console.log('DeleteUser in Failed!!!!');
        },
    }
})

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const { setUser, logOut } = user.actions;
export default user.reducer;
