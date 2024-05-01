import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    isAuthenticated: false,
    username: null,
    token: null,
    userId: null,
    error: null,
};

const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

        //Register Actions
        registerRequest: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.userId = action.payload.user._id;
            state.user = action.payload.user;
            state.error = null;
        },
        registerFailure: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
            state.userId = null;
        },

        //Login Actions

        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.userId = action.payload.user._id;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
            state.userId = null;
            state.error = action.payload;
        },

        //Logout Actions
        logoutRequest: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
            state.userId = null;
        },
        logoutFailure: (state) => {
            state.loading = false;
        },

        //Loading Actions
        loadUserRequest: (state) => {
            state.loading = true;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.userId = action.payload.user._id;
            state.user = action.payload.user;
        },
        loadUserFailure: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,

    registerRequest,
    registerSuccess,
    registerFailure,

    logoutRequest,
    logoutSuccess,
    logoutFailure,

    loadUserSuccess,
    loadUserFailure,
    loadUserRequest,
} = authSlice.actions;

export default authSlice.reducer;
