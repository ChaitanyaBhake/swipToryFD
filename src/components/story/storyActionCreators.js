import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    getStoriesRequest,
    getStoriesSuccess,
    getStoriesFailure,
    getBookmarksRequest,
    getBookmarksSuccess,
    getBookmarksFailure,
    fetchStoryRequest,
    fetchStorySuccess,
    fetchStoryFailure,
    bookmarkRequest,
    bookmarkSuccess,
    bookmarkFailure,
    likeSuccess,
    likeFailure,
    getStoryByUserRequest,
    getStoryByUserSuccess,
    getStoryByUserFailure,
    getCategoryStoriesSuccess,
    getCategoryStoriesFailure,
    getCategoryStoriesRequest,
} from './storySlice.js';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials = true;

// Action creator to fetch stories

export const getStories = (page, catLimit, cat) => async (dispatch) => {
    try {
        if (page === null) {
            page = 1;
        }
        if (catLimit === null) {
            catLimit = 4;
        }
        if (cat === null) {
            cat = 'All';
        }
        dispatch(getStoriesRequest());
        const { data } = await axios.get(
            `/api/story/getAll?category=All&page=${page}&catLimit=${catLimit}&cat=${cat}`
        );
        
        dispatch(getStoriesSuccess(data));
    } catch (error) {
        dispatch(getStoriesFailure());

        toast.error(error.response.data);
    }
};

// Action creator to fetch a single story
export const getStory = (storyId, userId) => async (dispatch) => {
    try {
        dispatch(fetchStoryRequest());
        if (userId == null) {
            //get story for not authenicated users
            const { data } = await axios.get(`/api/story/getById/${storyId}`);
            dispatch(fetchStorySuccess(data));
        } else {
            // get story for authenticated users to check liked/bookmarked or not
            const { data } = await axios.get(
                `/api/story/getById/${storyId}?userId=${userId}`
            );
            dispatch(fetchStorySuccess(data));
        }
    } catch (error) {
        dispatch(fetchStoryFailure());
        toast.error(error);
    }
};

// Action creator to fetch stories by a specific user
export const getStoriesByUser =
    (userId, userStoriesPage) => async (dispatch) => {
        try {
            if (userStoriesPage === null) {
                userStoriesPage = 1;
            }
            dispatch(getStoryByUserRequest());
            const { data } = await axios.get(
                `/api/story/getAll?userId=${userId}&page=${userStoriesPage}`
            );
            dispatch(getStoryByUserSuccess(data));
        } catch (error) {
            dispatch(getStoryByUserFailure());
            toast.error(error.response.data);
        }
    };

// Action creator to fetch stories by category
export const getStoriesByCategory = (category, page) => async (dispatch) => {
    try {
        if (page === null) {
            page = 1;
        }
        dispatch(getCategoryStoriesRequest());
        const { data } = await axios.get(
            `/api/story/getAll?category=${category}&page=${page}`
        );
        dispatch(getCategoryStoriesSuccess(data));
    } catch (error) {
        console.log('error', error);
        dispatch(getCategoryStoriesFailure());
        toast.error(error.response.data);
    }
};

// Action creator to like a story
export const likeStory = (id, userId) => async (dispatch) => {
    try {
        // dispatch(likeRequest());
        const data = await axios.put(`/api/story/like/${id}`, {
            userId: userId,
        });
        console.log('data', data);
        dispatch(likeSuccess(data.story));
        toast.success('Story liked successfully', { position: 'top-center' });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(likeFailure());
        toast.error(error.response.data.message, { position: 'top-center' });
    }
};

// Action creator to fetch user bookmarks
export const getBookmarks = (userId) => async (dispatch) => {
    try {
        dispatch(getBookmarksRequest());
        const { data } = await axios.get(`/api/user/bookmarks/${userId}`);
        dispatch(getBookmarksSuccess(data.bookmarks));
    } catch (error) {
        dispatch(getBookmarksFailure());
        toast.error(error.response.data);
    }
};

// Action creator to bookmark a story
export const bookmarkStory = (id, userId) => async (dispatch) => {
    try {
        dispatch(bookmarkRequest());
        const { data } = await axios.post(`/api/user/bookmark/${id}`, {
            userId: userId,
        });
        dispatch(bookmarkSuccess(data.story));
        toast.success('Story bookmarked successfully', {
            position: 'top-center',
        });
    } catch (error) {
        dispatch(bookmarkFailure());
        toast.error(error.response.data.message, { position: 'top-center' });
    }
};
