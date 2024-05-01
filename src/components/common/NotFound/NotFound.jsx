import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import  styles from './NotFound.module.css';
import { useSelector } from 'react-redux';

const NotFound = () => {
    const { isSmallScreen } = useSelector((state) => state.layout);

    const smallScreenImageUrl = `https://images.unsplash.com/photo-1708732865261-168281f8e2b1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
    const largeScreenImageUrl = `https://images.unsplash.com/photo-1489619547086-641e1c87c3ff?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

    const backgroundImage = isSmallScreen
        ? smallScreenImageUrl
        : largeScreenImageUrl;

    const navigate = useNavigate();
    return (
        <div
            className={styles.notFoundCon}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={styles.headingButtonCon}>
                
                <h1 className={styles.heading}>Wrong Location! 🌍</h1>
                <Button
                    text="Teleport 🚀"
                    myFunction={() => navigate('/')}
                    color="#ff6358"
                />
            </div>
        </div>
    );
};

export default NotFound;
