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
import closeIcon from '../../../assets/close.png';

const NavMobile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, username } = useSelector((state) => state.auth);

    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);

    // Logout Function
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    //Hamburger Click Function
    const handleHamburgerClick = () => {
        setIsHamburgerClicked(!isHamburgerClicked);
    };

    return (
        //Navbar Container
        <nav className={styles.navbarCon}>
            {/* Heading */}
            <h2 className={styles.navLogoText}>SwipTory</h2>

            {/* Navigation Buttons Container */}
            <div className={styles.navButtons}>
                {/* If user is not  auth, then  show Hamburger , Register, Sign In Button for mobile*/}
                {!isAuthenticated ? (
                    <>
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

                            {/* If hamburger clicked ,Show Register, Sign In Button   */}

                            {isHamburgerClicked && (
                                <div
                                    className={styles.hamburgerDivMob}
                                    style={{ height: '18rem' }}
                                >
                                    <Button
                                        text="Register Now"
                                        myFunction={() =>
                                            dispatch(openModal(REGISTER_USER))
                                        }
                                        size="small"
                                    ></Button>

                                    <div style={{ height: '1rem' }}></div>

                                    <Button
                                        text="Sign In"
                                        myFunction={() =>
                                            dispatch(openModal(LOGIN_USER))
                                        }
                                        size="small"
                                    ></Button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    // If authenticated show hamburger
                    <div className="hamburger" onClick={handleHamburgerClick}>
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

                        {/* If hamburger clicked ,Show  Avatar Image, User stories , User BookMarks , Add New Story, Logout Buttons */}
                        {isHamburgerClicked && (
                            <div className={styles.hamburgerDivMob}>
                                <div
                                    className={styles.hamburgerAvatarAndNameDiv}
                                >
                                    <img
                                        src={avatar}
                                        alt="avatar"
                                        className={styles.avatarImg}
                                        width="40rem"
                                        onClick={() => navigate('/')}
                                    />
                                    <h4 style={{ marginBottom: '1rem' }}>
                                        {username}
                                    </h4>
                                    {/* Close Button Svg */}
                                    {isHamburgerClicked && (
                                        <div
                                            className={styles.closeHamburger}
                                            onClick={handleHamburgerClick}
                                        >
                                            <img src={closeIcon} alt="close" />
                                        </div>
                                    )}
                                </div>

                                {/* Your Story Button */}

                                <Button
                                    text="Your Story"
                                    myFunction={() => navigate('/my/stories')}
                                    size="small"
                                ></Button>

                                <div style={{ marginBottom: '2rem' }}></div>

                                {/* Add Story Button */}

                                <Button
                                    text="Add story"
                                    myFunction={() =>
                                        dispatch(openModal(ADD_NEW_STORY))
                                    }
                                    size="small"
                                ></Button>

                                <div style={{ marginBottom: '2rem' }}></div>

                                {/* Bookmark Button */}

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

                                <div style={{ marginBottom: '2rem' }}></div>

                                {/* Logout Button */}

                                <Button
                                    text="Logout"
                                    myFunction={handleLogout}
                                    size="small"
                                ></Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavMobile;
