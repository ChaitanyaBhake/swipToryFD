import styles from './Bookmarks.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBookmarks } from '../components/story/storyActionCreators';
import { useSelector } from 'react-redux';
import Story from '../components/story/StoryCard/StoryCard';
import Button from '../components/common/Button/Button';
import Loader from '../components/common/Loader/Loader';

const Bookmarks = () => {
    const navigate = useNavigate();
    const { bookmarks, areBookmarksLoading } = useSelector(
        (state) => state.story
    );
    const { userId, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Fetch bookmarks when component mounts
    useEffect(() => {
        dispatch(getBookmarks(userId));
    }, []);

    // Check Auth
    if (!isAuthenticated) {
        return (
            <h1 className={styles.authHeading}>
                Please Login to see your Bookmarks
            </h1>
        );
    }

    if (areBookmarksLoading) {
        return <Loader></Loader>;
    }
    return (
        <div>
            <h1 className={styles.bookmarkHeading}>Your Bookmarks</h1>
            <div className={styles.userBookmarkDiv}>
                {bookmarks &&
                    bookmarks.map((bookmark) => (
                        <Story story={bookmark} key={bookmark._id} />
                    ))}

                {bookmarks && bookmarks.length === 0 && (
                    <div className={styles.noBookmarksAvalDiv}>
                        <h1 className={styles.noBookmarksHeading}>
                            You have no bookmarks!
                        </h1>
                        <Button
                            text={'Go to Home'}
                            myFunction={() => navigate('/')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
