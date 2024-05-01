import { useSelector } from 'react-redux';
import styles from './Modal.module.css';

const Modal = ({ children }) => {
    const { modal } = useSelector((state) => state.modal);

    return (
        <>
            <div
                className={styles.modal}
                style={{
                    background: modal ? '#000000e6' : '#ffff',
                }}
            >
                {children}
            </div>
        </>
    );
};

export default Modal;
