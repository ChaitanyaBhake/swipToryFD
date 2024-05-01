import StoryCard from '../components/story/StoryCard/StoryCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/common/Button/Button';
import { getStoriesByUser } from '../components/story/storyActionCreators';
import styles from "./UserStories.module.css"

const UserStories = () => {
    const navigate = useNavigate();
    const { userId, isAuthenticated } = useSelector((state) => state.auth);
    const { userStories, userStoriesPage } = useSelector(
        (state) => state.story
    );
    const dispatch = useDispatch();

     // Fetch user stories when component mounts or when userId changes
    useEffect(() => {
        if (isAuthenticated && !userStories && userId) {
            dispatch(getStoriesByUser(userId, userStoriesPage));
        }
    }, [isAuthenticated, userId, userStories, userStoriesPage, dispatch]);

    if (!isAuthenticated) {
      return (
          <h1 className={styles.authHeading}>
              Please Login to see your Stories
          </h1>
      );
  }

    return (
        <div>
            <h1 className={styles.storyHeading}>Your Stories</h1>
            <div className={styles.userStoriesDiv}>
                {userStories &&
                    userStories.map((story) => (
                        <StoryCard key={story._id} story={story} />
                    ))}

                {userStories && userStories.length === 0 && (
                    <div className={styles.noStoriesAvalDiv}>
                        <h1 className={styles.noStoriesHeading}>You have not added any stores yet!</h1>
                        <Button
                            text="Go to Home"
                            myFunction={() => navigate('/')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserStories;
