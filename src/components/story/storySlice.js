import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    singleStoryLoading: false,
    multipleStoriesLoading: false,
    areBookmarksLoading: false,
    categoryLoading: false,
    stories: [],
    categoryStories: [],
    bookmarks: [],
    userStories: null,
    story: null,
    bookmarked: false,
    liked: false,
    totalLikes: 0,
    newLike: false,
    newStory: false,
    page: 1,
    userStoriesPage: 1,
};

const storySlice = createSlice({
    initialState,
    name: 'story',
    reducers: {
        createStoryRequest: (state) => {
            state.multipleStoriesLoading = true;
            state.newStory = false;
        },
        createStorySuccess: (state) => {
            state.multipleStoriesLoading = false;
            state.newStory = true;
        },
        createStoryFailure: (state) => {
            state.multipleStoriesLoading = false;
            state.newStory = false;
        },

        getStoriesRequest: (state) => {
            state.multipleStoriesLoading = true;
        },
        getStoriesSuccess: (state, action) => {
            state.multipleStoriesLoading = false;
            state.stories = action.payload.stories;
            state.page = action.payload.page;
        },
        getStoriesFailure: (state) => {
            state.multipleStoriesLoading = false;
        },

        fetchStoryRequest: (state) => {
            state.singleStoryLoading = true;
        },
        fetchStorySuccess: (state, action) => {
            state.singleStoryLoading = false;
            state.story = action.payload.story;
            state.liked = action.payload.liked;
            state.totalLikes = action.payload.totalLikes;
            state.bookmarked = action.payload.bookmarked;
        },

        fetchStoryFailure: (state) => {
            state.singleStoryLoading = false;
        },

        getBookmarksRequest: (state) => {
            state.areBookmarksLoading = true;
        },
        getBookmarksSuccess: (state, action) => {
            state.areBookmarksLoading = false;
            state.bookmarks = action.payload;
        },
        getBookmarksFailure: (state) => {
            state.areBookmarksLoading = false;
        },

        bookmarkRequest: (state) => {
            state.singleStoryLoading = true;
        },
        bookmarkSuccess: (state) => {
            state.singleStoryLoading = false;
            state.bookmarked = true;
        },
        bookmarkFailure: (state) => {
            state.singleStoryLoading = false;
        },
        likeRequest: (state) => {
            state.singleStoryLoading = true;
            state.newLike = false;
        },
        likeSuccess: (state) => {
            state.singleStoryLoading = false;
            state.liked = true;
            state.newLike = true;
        },
        likeFailure: (state) => {
            state.singleStoryLoading = false;
            state.newLike = false;
        },

        getStoryByUserRequest: (state) => {
            state.multipleStoriesLoading = true;
        },

        getStoryByUserSuccess: (state, action) => {
            state.multipleStoriesLoading = false;
            state.userStories = action.payload.stories;
            state.userStoriesPage = action.payload.page;
        },
        
        getStoryByUserFailure: (state) => {
            state.multipleStoriesLoading = false;
        },

        getCategoryStoriesRequest: (state) => {
            state.categoryLoading = true;
        },
        getCategoryStoriesSuccess: (state, action) => {
            state.categoryLoading = false;
            state.categoryStories = action.payload.stories;
            state.page = action.payload.page;
        },
        getCategoryStoriesFailure: (state) => {
            state.categoryLoading = false;
        },

        editStorySuccess: (state) => {
            state.newStory = true;
        },
        endRequest: (state) => {
            state.newStory = false;
            state.newLike = false;
        },
    },
});

export const {
    createStoryRequest,
    createStorySuccess,
    createStoryFailure,
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
    likeRequest,
    likeSuccess,
    likeFailure,
    getCategoryStoriesRequest,
    getCategoryStoriesSuccess,
    getCategoryStoriesFailure,
    getStoryByUserRequest,
    getStoryByUserSuccess,
    getStoryByUserFailure,
    editStorySuccess,
    endRequest,
} = storySlice.actions;

export default storySlice.reducer;
