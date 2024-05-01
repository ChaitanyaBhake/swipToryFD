import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
    REGISTER_USER,
    ADD_NEW_STORY,
    UPDATE_STORY,
    LOGIN_USER,
} from './constants';
import { loadUser } from './components/auth/authActionCreators.js';

import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks.jsx';
import Loader from './components/common/Loader/Loader';
import UserStories from './pages/UserStories';
import AuthForm from './components/auth/Auth';
import Navbar from './components/common/Navbar/Navbar';
import Modal from './components/common/Modal/Modal.jsx';
import NotFound from './components/common/NotFound/NotFound';
import AddStory from './components/story/StoryForm/StoryAdd.jsx';
import EditStory from './components/story/StoryForm/StoryEdit.jsx';
import ShowStory from './components/story/StoryDetail/StoryDetail.jsx';

const App = () => {
    const dispatch = useDispatch();
    const { modalContent } = useSelector((state) => state.modal);
    const { loading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    if (loading) {
        return <Loader />;
    }

    let modalComponent = null;

    if (modalContent === REGISTER_USER || modalContent === LOGIN_USER) {
        modalComponent = <AuthForm />;
    } else if (modalContent === ADD_NEW_STORY) {
        modalComponent = <AddStory />;
    } else if (modalContent === UPDATE_STORY) {
        modalComponent = <EditStory />;
    }

    return (
        <>
            <Navbar />

            {modalComponent && <Modal>{modalComponent}</Modal>}

            <ToastContainer />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/story/:id"
                    element={
                        <Modal>
                            <ShowStory />
                        </Modal>
                    }
                />

                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/my/stories" element={<UserStories />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
