import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json'
};

export const getUserThunk = createAsyncThunk(
    'getUser',
    async (query) => fetch(`${process.env.REACT_APP_BASE_URL}/User/${query}`, {
      method: 'GET',
      headers: {
        ...headers,
      },
    }).then((res) => res.json()),
  );

  export const getUserToken = createAsyncThunk(
    'getUserToken',
    async (uuid) => fetch(`${process.env.REACT_APP_BASE_URL}/user/getToken/${uuid}`, {
      method: 'GET',
      headers: {
        ...headers
      },
    }).then((res) => res.json()),
  );

export const getLoggedInUserThunk = createAsyncThunk(
    'getLoggedInUser',
    async (token) => fetch(`${process.env.REACT_APP_BASE_URL}/User/GetLoggedInUser`, {
      method: 'GET',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`
      },
    }).then((res) => res.json()),
  );

  export const logInThunk = createAsyncThunk(
    'login',
    async (query) => fetch(`${process.env.REACT_APP_BASE_URL}/User/Login`, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: JSON.stringify(query),
    }).then((res) => res.text()),
  );

  export const signUpThunk = createAsyncThunk(
    'signUp',
    async (query) => fetch(`${process.env.REACT_APP_BASE_URL}/User/Signup`, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: JSON.stringify(query),
    }).then((res) => res.text()),
  );

  export const updateUserThunk = createAsyncThunk(
    'updateUser',
    async ({query, token}) => fetch(`${process.env.REACT_APP_BASE_URL}/User/UpdateUser`, {
      method: 'POST',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(query),
    }).then((res) => res.json()),
  );
  export const deleteUserThunk = createAsyncThunk(
    'deleteUser',
    async ({query, token}) => fetch(`${process.env.REACT_APP_BASE_URL}/User/DeleteUser`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(query),
    }).then((res) => res.json()),
  );

const user = createSlice({
    name: 'user',
    initialState: {
        authToken: "",
        uuid: "",
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
        status: 'idle',
        statusMessage: ''
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
        logOut: (state, action) => {
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
            s.authToken = '';
            s.uuid = '';
            localStorage.clear();
            if(action.payload)
            {
              if(process.env.REACT_APP_SPLIT === "true")
              {
                window.location = process.env.REACT_APP_APP_URL + '/logout';
              }
              else{
                var domain = window.location.host.split('.');
                domain.shift();
                window.location = window.location.protocol + "//" + domain.join('.') + '/logout';
              }
            }
        },
        setStatusToIdle: (state) => {
          const s = state; 
          s.status = 'idle';
        },
        /**
         * This function sets the value of the authentication token of the user.
         * @method
         * @param {object} state The object that stores the current user's authentication token.
         * @param {object} action The object that contains the new value of the user's authentication token.
         */
        setAuthToken: (state, action) => {
          const s = state;
          s.authToken = action.payload;
          localStorage.setItem('authToken', action.payload);
        },
        /**
         * This function retrives the user's authentication token from local storage if exist.
         * @method
         * @param {object} state The object that stores the current user's data.
         */
        getAuthToken: (state) => {
          const s = state;
          const authToken = localStorage.getItem('authToken');
          if (authToken) {
            s.authToken = authToken;
            // localStorage.clear();
            localStorage.setItem('authToken', s.authToken);
          }
          else {
            s.authToken = '';
          }
          const uuid = localStorage.getItem('uuid');
          if (uuid) {
            s.uuid = uuid;
            // localStorage.clear();
            localStorage.setItem('uuid', s.uuid);
          }
          else {
            s.uuid = '';
          }
        }
      },
      extraReducers: {
        [getUserThunk.pending]: (state) => {
          const s = state; 
          s.status = 'pending';
        },
        [getUserThunk.fulfilled]: (state, { payload }) => {
          const s = state; 
          s.user = payload;
          s.status = 'fulfilled';
        },
        [getUserThunk.rejected]: (state) => {
          const s = state; 
          s.status = 'rejected';
        },
        [getUserToken.pending]: (state, { payload }) => {
          console.log('getUserToken in Progress');
        },
        [getUserToken.fulfilled]: (state, { payload }) => {
          const s = state;
            s.authToken = payload.token;
            s.uuid = payload.uuid;
            localStorage.setItem('authToken', s.authToken);
            s.status = 'fulfilled';
        },
        [getUserToken.rejected]: () => {
          console.log('getUserToken Failed!!!!');
        },
        [getLoggedInUserThunk.pending]: (state, { payload }) => {
          console.log('User Authentication in Progress');
        },
        [getLoggedInUserThunk.fulfilled]: (state, { payload }) => {
          state.user = payload;
        },
        [getLoggedInUserThunk.rejected]: () => {
          console.log('User Authentication in Failed!!!!');
        },
        [logInThunk.pending]: (state) => {
          console.log('Login in Progress');
          const s = state; 
          s.status = 'pending';
        },
        [logInThunk.fulfilled]: (state, { payload }) => {
          const s = state; 
          try {
            const resJSON = JSON.parse(payload);
            s.authToken = resJSON.token;
            s.uuid = resJSON.uuid;
            localStorage.setItem('authToken', s.authToken);
            localStorage.setItem('uuid', s.uuid);
            s.status = 'fulfilled';
          } catch (e) {
            s.status = 'failed';
            s.statusMessage = payload;
           }
        },
        [logInThunk.rejected]: (state) => {
          console.log('Login in Failed!!!!');
          const s = state; 
          s.status = 'rejected';
        },
        [signUpThunk.pending]: (state) => {
          console.log('SignUp in Progress');
          const s = state; 
          s.status = 'pending';
        },
        [signUpThunk.fulfilled]: (state, { payload }) => {
          const s = state;
          try {
            const resJSON = JSON.parse(payload);
            s.authToken = resJSON.token;
            s.uuid = resJSON.uuid;
            localStorage.setItem('authToken', s.authToken);
            localStorage.setItem('uuid', s.uuid);
            s.status = 'fulfilled';

          } catch (e) {
            s.status = 'failed';
            s.statusMessage = payload;
           }
        },
        [signUpThunk.rejected]: (state) => {
          console.log('SignUp in Failed!!!!');
          const s = state; 
          s.status = 'rejected';
        },
        [updateUserThunk.pending]: () => {
          console.log('UpdateUser in Progress');
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
          state.user = payload;
        },
        [updateUserThunk.rejected]: () => {
          console.log('UpdateUser in Failed!!!!');
        },
        [deleteUserThunk.pending]: () => {
          console.log('DeleteUser in Progress');
        },
        [deleteUserThunk.fulfilled]: (state, { payload }) => {
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
export const selectUserAuthToken = (state) => state.user.authToken;
export const selectUserUUID = (state) => state.user.uuid;
export const selectUserStatus = (state) => state.user.status;
export const selectUserStatusMessage = (state) => state.user.statusMessage;
export const { setUser, setAuthToken, logOut, setStatusToIdle, getAuthToken } = user.actions;
export default user.reducer;
