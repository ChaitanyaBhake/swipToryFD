import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
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
    loadUserRequest,
    loadUserFailure,
} from './authSlice';

import { getStoriesByUser } from '../story/storyActionCreators';

//Axios base url 
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

//Include Cookies in Requests
axios.defaults.withCredentials = true;

// Action creator to load user data
export const loadUser = () => async (dispatch) => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('username'));
    if (!token) {
        // If token does not exist, dispatch loadUserFailure to indicate that user data is not available
        dispatch(loadUserFailure());
        return;
    }

    try {
        // Dispatch loadUserRequest action for loading animation
        dispatch(loadUserRequest());
        // Send GET request to load user data
        const { data } = await axios.get(`/api/user/load/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // Dispatch loadUserSuccess action with user data as payload
        dispatch(loadUserSuccess(data));
    } catch (error) {
        // Dispatch loadUserFailure action if request fails
        dispatch(loadUserFailure());
        // Log error to console
        console.log(error);
    }
};


// Action creator to register a new user
export const registerUser = (values) => async (dispatch) => {
    try {
        // Dispatch registerRequest action for loading
        dispatch(registerRequest());
        // Send POST request to register user with provided values
        const { data } = await axios.post('/api/user/register', values, {
            withCredentials: true,
        });
        // Dispatch registerSuccess action with registered user data
        dispatch(registerSuccess(data));

         // Include token in request headers for subsequent requests
         axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        localStorage.setItem('token', data.token);


        // Store username in local storage
        localStorage.setItem('username', JSON.stringify(data.username));
        
        // Show success toast message
        toast.success('Register Successful', {
            position: 'bottom-left',
            autoClose: 2000,
        });
    } catch (error) {
        // Dispatch registerFailure action if registration fails
        dispatch(registerFailure());
        dispatch(loginFailure(error.response.data));
        // Log error to console
        console.log(error.response.data);
        // Show error toast message
        toast.error(error.response.data);
    }
};


// Action creator to log in a user
export const loginUser = (values) => async (dispatch) => {
    try {
        // Dispatch loginRequest action
        dispatch(loginRequest());
        // Send POST request to login user with provided values as json data (body)
        const { data } = await axios.post('/api/user/login', values, {
            withCredentials: true,
        });
        // Dispatch loginSuccess action with logged-in user data
        dispatch(loginSuccess(data));
        // Dispatch getStoriesByUser action to fetch user's stories
        dispatch(getStoriesByUser(data.userId));
        // Store token and username in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', JSON.stringify(data.username));
        
        // Include token in request headers for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        // Show success toast message
        toast.success('Login Successful', {
            position: 'bottom-left',
            autoClose: 2000,
        });
    } catch (error) {
        // Dispatch loginFailure action if login fails
        dispatch(loginFailure(error.response.data));
        // Show error toast message
        toast.error(error.response.data);
    }
};

// Action creator to log out a user
export const logout = () => async (dispatch) => {
    try {
        // Dispatch logoutRequest action
        dispatch(logoutRequest());
        // Send POST request to log out user
        await axios.post('/api/user/logout', { withCredentials: true });
        // Dispatch logoutSuccess action
        dispatch(logoutSuccess());
        // Remove username from local storage
        localStorage.removeItem('username');
        // Show success toast message
        toast.success('Logout Successful', {
            position: 'top-left',
            autoClose: 1000,
        });
    } catch (error) {
        // Dispatch logoutFailure action if logout fails
        dispatch(logoutFailure());
        // Show error toast message
        toast.error(error.response.data);
    }
};
