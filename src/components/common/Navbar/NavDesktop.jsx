import { useState } from 'react';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/authActionCreators';
import { openModal } from '../Modal/modalSlice';
import { useNavigate } from 'react-router-dom';
import avatar from '../../../assets/avatar.png';
import bookmarkImg from '../../../assets/bookmark.jpg';
import { REGISTER_USER, LOGIN_USER, ADD_NEW_STORY } from '../../../constants';
import Button from '../Button/Button';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, username } = useSelector((state) => state.auth);

    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleHamburgerClick = () => {
        setIsHamburgerClicked(!isHamburgerClicked);
    };
    return (
        <>
            {/* //Navbar Container */}
            <nav className={styles.navbarCon} style={{padding:"1.5rem"}}>
                {/* Heading */}
                <h2 className={styles.navLogoText} onClick={()=> navigate("/")}>SwipTory</h2>

                {/* Navigation Buttons Container */}
                <div className={styles.navButtons}>
                    {/* If user is not auth, show register and sign in button component */}
                    {!isAuthenticated ? (
                        <>
                            <Button
                                text="Register Now"
                                myFunction={() =>
                                    dispatch(openModal(REGISTER_USER))
                                }
                                size="small"
                            ></Button>

                            <Button
                                text="Sign In"
                                myFunction={() =>
                                    dispatch(openModal(LOGIN_USER))
                                }
                                size="small"
                                color="#73abff"
                            ></Button>
                        </>
                    ) : (
                        <>
                            {/* // if Auth Show Bookmarks,AddStory,AvatarImage,Hamburger*/}

                            <Button
                                text="Bookmarks"
                                myFunction={() => navigate('/bookmarks')}
                                size="small"
                            >
                                <img
                                    src={bookmarkImg}
                                    width="14rem"
                                    style={{ marginRight: '0.2rem' }}
                                />
                            </Button>

                            <Button
                                text="Add story"
                                myFunction={() =>
                                    dispatch(openModal(ADD_NEW_STORY))
                                }
                                size="small"
                            ></Button>

                            {/* Avatar Img */}
                            <div>
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    className={styles.avatarImg}
                                    width="40rem"
                                    onClick={() => navigate('/')}
                                />
                            </div>

                            {/* Hamburger Svg */}
                            <div onClick={handleHamburgerClick}>
                                <svg
                                    width="20"
                                    height="14"
                                    viewBox="0 0 20 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 13H19M1 7H19M1 1H19"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                {/* If Hamburger clicked show Logout Button */}
                                {isHamburgerClicked && (
                                    <div className={styles.hamburgerDiv}>
                                        <h4 style={{ marginBottom: '1rem' }}>
                                            {username}
                                        </h4>
                                        <Button
                                            text="Logout"
                                            myFunction={handleLogout}
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
