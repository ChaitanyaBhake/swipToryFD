import styles from './Button.module.css';
import { useSelector } from 'react-redux';


const Button = ({ myFunction, color, text, children, size }) => {
    const { isSmallScreen } = useSelector((state) => state.layout);

    return (
        <button
            className={`${styles.button} ${
                size === 'small' ? styles.smallSizeButton : ''
            } ${isSmallScreen ? styles.smallMobileButton : ''}`}
            style={{ backgroundColor: color ? color : '#FF7373' }}
            onClick={() => {
                myFunction();
            }}
        >
            {children}
            {text}
        </button>
    );
};

export default Button;
