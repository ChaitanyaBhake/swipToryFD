import { useEffect } from 'react';
import styles from './StoryList.module.css';
import StoryCard from '../StoryCard/StoryCard';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStories,
    getStoriesByCategory,
    getStoriesByUser,
} from '../storyActionCreators';

import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';

const Stories = ({ category }) => {
    const dispatch = useDispatch();

    const {
        stories,
        categoryStories,
        userStories,
        newStory,
        userStoriesPage,
        categoryLoading,
        multipleStoriesLoading,
    } = useSelector((state) => state.story);

    const { userId, isAuthenticated } = useSelector((state) => state.auth);

    const page = useSelector((state) => state.story.page) || 1;

    let catLimit = {
        Medical: 4,
        Fruits: 4,
        World: 4,
        India: 4,
    };


    // Fetch stories again if new story is added
    useEffect(() => {
        if (newStory) {
            dispatch(getStories(page));
        }
    }, [newStory]);

    // Fetch user stories if user is authenticated
    useEffect(() => {
        if (isAuthenticated && !userStories && userId) {
            dispatch(getStoriesByUser(userId, userStoriesPage));
        }
    }, [isAuthenticated, userId, userStories, userStoriesPage, dispatch]);

    // Function to render the list of stories
    const renderStories = (storyArray, isLoading, paginationFxn) => (
        <>
            <div className={styles.storiesListDiv}>
                {storyArray &&
                    storyArray.map((story, i) =>
                        isLoading ? (
                            <Loader key={i} />
                        ) : (
                            <StoryCard key={story._id} story={story} />
                        )
                    )}
            </div>

            {storyArray && storyArray.length > 0 && (
                <div
                    style={{
                        width: '100%',
                        display: 'inline-flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        text="See more..."
                        myFunction={paginationFxn}
                    ></Button>
                </div>
            )}
        </>
    );

    // Function to render user stories
    const renderUserStories = () => (
        <>
            {userStories && userStories.length > 0 && (
                <h2 className={styles.storiesHeading}>Your Stories</h2>
            )}
            {renderStories(userStories, false, () =>
                dispatch(getStoriesByUser(userId, userStoriesPage + 1))
            )}
        </>
    );

    return (
        <div className={styles.storiesContainerDiv}>
            {category === 'All' && (
                <>
                    {/* If auth,then show user's stories list */}
                    {isAuthenticated && renderUserStories()}

                    {/* Show All Stories List By Category */}
                    <>
                        {/* Iterate over each category and render stories */}
                        {Object.keys(stories).map(
                            (key) =>
                                stories[key].length > 0 && (
                                    <div key={key}>
                                        <h2 className={styles.storiesHeading}>
                                            Top Stories About {key}
                                        </h2>
                                        {/* Render stories for the current category */}
                                        {renderStories(
                                            stories[key],
                                            multipleStoriesLoading,
                                            () =>
                                                Object.keys(catLimit).forEach(
                                                    (cat) => {
                                                        if (cat === key) {
                                                            catLimit[cat] =
                                                                catLimit[cat] +
                                                                4;
                                                            // Dispatch action to load more stories
                                                            dispatch(
                                                                getStories(
                                                                    page + 1,
                                                                    catLimit[
                                                                        cat
                                                                    ],
                                                                    cat
                                                                )
                                                            );
                                                        }
                                                    }
                                                )
                                        )}
                                    </div>
                                )
                        )}
                    </>
                </>
            )}

            {/* Render selected category stories */}
            {category !== 'All' && (
                <div>
                    <h2 className={styles.storiesHeading}>
                        Top Stories About {category}
                    </h2>
                    {renderStories(categoryStories, categoryLoading, () =>
                        dispatch(getStoriesByCategory(category, page + 1))
                    )}
                    {categoryStories.length <= 0 && (
                        <h1 className={styles.noStoryAval}>
                            No stories found!
                        </h1>
                    )}
                </div>
            )}
        </div>
    );
};

export default Stories;
