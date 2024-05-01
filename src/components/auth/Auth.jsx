import { useEffect, useState } from 'react';
import styles from './Auth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER_USER, LOGIN_USER } from '../../constants';
import { openModal, closeModal } from '../common/Modal/modalSlice';
import { loadUser, loginUser, registerUser } from './authActionCreators';

const Auth = () => {
    const dispatch = useDispatch();

    const [values, setValues] = useState({ username: '', password: '' });
    const { username, password } = values;
    const { modalContent, modal } = useSelector((state) => state.modal);
    const [showPassword, setShowPassword] = useState(false); // Add state for password visibility

    const {
        isAuthenticated,
        username: user, //username is aliased to user because username is already defined in state variable object
        error,
    } = useSelector((state) => state.auth);

    // Effect to handle modal opening and closing based on authentication status
    useEffect(() => {
        modalContent === REGISTER_USER
            ? dispatch(openModal(REGISTER_USER))
            : dispatch(openModal(LOGIN_USER));
        if (isAuthenticated) {
            dispatch(closeModal());
            dispatch(loadUser(user));
        }
    }, [dispatch, isAuthenticated, modal]);

    // Function to close the modal
    const handleClose = () => {
        dispatch(closeModal());
    };

    // Function to handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalContent === LOGIN_USER) {
            try {
                dispatch(loginUser(values));
            } catch (error) {
                console.error('Login Error:', error);
            }
        }
        if (modalContent === REGISTER_USER) {
            try {
                dispatch(registerUser(values));
            } catch (error) {
                console.error('Register Error:', error);
            }
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        // {Wrapper Div}
        <div className={`${styles.authWrapperDiv}`}>
            <div className={styles.authFormCon}>
                
                {/* Heading & Close Button */}

                <div>
                    <h2 className={styles.authHeading}>
                        {modalContent === LOGIN_USER ? 'Login' : 'Register '} to
                        SwipTory
                    </h2>
                    <svg
                        className={`${styles.closeSvg} `}
                        onClick={handleClose}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 0C5.38341 0 0 5.38341 0 12C0 18.6166 5.38341 24 12 24C18.6166 24 24 18.6166 24 12C24 5.38341 18.6166 0 12 0ZM12 1.84615C17.6178 1.84615 22.1538 6.38221 22.1538 12C22.1538 17.6178 17.6178 22.1538 12 22.1538C6.38221 22.1538 1.84615 17.6178 1.84615 12C1.84615 6.38221 6.38221 1.84615 12 1.84615ZM8.50962 7.18269L7.18269 8.50962L10.6731 12L7.18269 15.4904L8.50962 16.8173L12 13.3269L15.4904 16.8173L16.8173 15.4904L13.3269 12L16.8173 8.50962L15.4904 7.18269L12 10.6731L8.50962 7.18269Z"
                            fill="#FF0000"
                        />
                    </svg>
                </div>

                {/* Login / Register Form  */}

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    {/* Username */}

                    <div className={styles.inputConDiv}>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            name="username"
                            onChange={handleChange}
                            className={styles.authInput}
                        />
                    </div>

                    {/* Password */}

                    <div className={styles.inputConDiv}>
                        <label>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Conditional rendering based on showPassword state
                            placeholder="Enter Password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            className={styles.authInput}
                        />

                        {/* Eye icon for toggling password visibility */}

                        <div
                            className={styles.eyeIcon}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 4.5C8.14 4.5 4.74 6.88 2.88 10C4.74 13.12 8.14 15.5 12 15.5C15.86 15.5 19.26 13.12 21.12 10C19.26 6.88 15.86 4.5 12 4.5ZM12 13C10.47 13 9.22 11.83 8.78 10C9.22 8.17 10.47 7 12 7C13.53 7 14.78 8.17 15.22 10C14.78 11.83 13.53 13 12 13ZM12 5.5C14.21 5.5 16.26 7.29 17.24 10C16.26 12.71 14.21 14.5 12 14.5C9.79 14.5 7.74 12.71 6.76 10C7.74 7.29 9.79 5.5 12 5.5ZM12 11C13.1 11 14 10.1 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9C10 10.1 10.9 11 12 11Z"
                                        fill="#000000"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 22 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14 8.79565 13.6839 9.55871 13.1213 10.1213C12.5587 10.6839 11.7956 11 11 11C10.2044 11 9.44129 10.6839 8.87868 10.1213C8.31607 9.55871 8 8.79565 8 8C8 7.20435 8.31607 6.44129 8.87868 5.87868C9.44129 5.31607 10.2044 5 11 5ZM11 0.5C16 0.5 20.27 3.61 22 8C20.27 12.39 16 15.5 11 15.5C6 15.5 1.73 12.39 0 8C1.73 3.61 6 0.5 11 0.5ZM2.18 8C2.98825 9.65031 4.24331 11.0407 5.80248 12.0133C7.36165 12.9858 9.1624 13.5013 11 13.5013C12.8376 13.5013 14.6383 12.9858 16.1975 12.0133C17.7567 11.0407 19.0117 9.65031 19.82 8C19.0117 6.34969 17.7567 4.95925 16.1975 3.98675C14.6383 3.01424 12.8376 2.49868 11 2.49868C9.1624 2.49868 7.36165 3.01424 5.80248 3.98675C4.24331 4.95925 2.98825 6.34969 2.18 8Z"
                                        fill="black"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Show Error if present */}

                    {error && (
                        <div style={{ textAlign: 'center', padding: '1rem' }}>
                            <h3 style={{ color: 'red' }}>{error.message}</h3>
                        </div>
                    )}

                    {/* Login /Register Button Div */}

                    <div className={styles.authButtonCon}>
                        <button
                            className={styles.buttonRegisterLogin}
                            type="submit"
                        >
                            {modalContent === REGISTER_USER
                                ? 'Register'
                                : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;
