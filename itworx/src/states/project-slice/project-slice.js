import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const headers = {
  'Content-Type': 'application/json'
};

export const getProjectThunk = createAsyncThunk(
    'getProject',
    async (query) => fetch(`${process.env.REACT_APP_BASE_URL}/Project/${query}`, {
      method: 'GET',
      headers: {
        ...headers
      },
    }).then((res) => res.json()),
  );

export const getUserProjectsThunk = createAsyncThunk(
    'getUserProjects',
    async (query) => fetch(`${process.env.REACT_APP_BASE_URL}/Project/user/${query}`, {
      method: 'GET',
      headers: {
        ...headers
      },
    }).then((res) => res.json()),
  );

  export const addProjectThunk = createAsyncThunk(
    'addProject',
    async (query) => fetch(`${process.env.REACT_APP_BASE_URL}/Project/Add`, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: JSON.stringify(query),
    }).then((res) => res.json()),
  );


const project = createSlice({
    name: 'project',
    initialState: {
        project: {
        }
        // ex:
    },
    reducers: {
        /**
         * This function adds/updates the project's data.
         * @method
         * @param {object} state The object that stores the current project's data.
         * @param {object} action The object containing the new project's data.
         */
        setProject: (state, action) => {
            const s = state;
            s.project = action.payload
        },
        /**
         * This function empties the project data.
         * @method
         * @param {object} state The object that stores the current project data.
         */
        emptyProject: (state) => {
            const s = state;
            s.project = {
            };
        }
    },
    extraReducers: {
        [getProjectThunk.pending]: () => {
        },
        [getProjectThunk.fulfilled]: (state, { payload }) => {
          console.log('Get Project Payload:',payload);
          state.project = payload;
        },
        [getProjectThunk.rejected]: () => {
        },
        [getUserProjectsThunk.pending]: () => {
        },
        [getUserProjectsThunk.fulfilled]: (state, { payload }) => {
          console.log('Get User Projects Payload:',payload);
          state.project = payload;
        },
        [getUserProjectsThunk.rejected]: () => {
        },
        [addProjectThunk.pending]: () => {
          console.log('Add Project in Progress');
        },
        [addProjectThunk.fulfilled]: (state, { payload }) => {
          console.log('Add Project Payload:',payload);
          state.project = payload;
        },
        [addProjectThunk.rejected]: () => {
          console.log('Add Project Failed!!!!');
        },
    }
})

export const selectProject = (state) => state.project.project;
export const { setProject, emptyProject } = project.actions;
export default project.reducer;
