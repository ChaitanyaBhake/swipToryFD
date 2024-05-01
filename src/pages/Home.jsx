import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../components/story/Categories/Categories';
import StoriesList from '../components/story/ListOfStories/StoryList.jsx';
import {
    getStoriesByCategory,
    getStories,
    getStoriesByUser,
} from '../components/story/storyActionCreators.js';
import Loader from '../components/common/Loader/Loader';
import { endRequest } from '../components/story/storySlice';
import { categories } from '../constants';

const Home = () => {
    const dispatch = useDispatch();

    const { userId } = useSelector((state) => state.auth);
    const [category, setCategory] = useState('All');
    const {
        multipleStoriesLoading,
        categoryLoading,
        newStory,
        userStoriesPage,
        newLike,
    } = useSelector((state) => state.story);

    // Fetch stories based on selected category
    useEffect(() => {
        if (category !== 'All') {
            dispatch(getStoriesByCategory(category, 1));
            console.log('UseEffect2 Called');
        } else {
            dispatch(getStories(1));
        }
    }, [category]);

    // Fetch stories when a new story is added
    useEffect(() => {
        if (newStory) {
            dispatch(getStories(1));
            dispatch(getStoriesByUser(userId, userStoriesPage));
            dispatch(endRequest());
        }
        
    }, [newStory]);

    //Revert back to default state once story is liked
    useEffect(() => {
        if (newLike) {
            dispatch(endRequest());
        }
    }, [newLike]);

    //Change Category States from All  to  Medical,Fruits, World,India
    const handleCategoryClick = (category) => {
        setCategory(category);
    };

    return (
        <>
            <Categories
                categories={categories}
                handleCategoryClick={handleCategoryClick}
                selectedCategory={category}
            />

            {multipleStoriesLoading && <Loader />}
            {categoryLoading && <Loader />}

            {!multipleStoriesLoading && <StoriesList category={category} />}
        </>
    );
};

export default Home;
