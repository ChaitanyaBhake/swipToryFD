import  { useEffect } from 'react';
import NavMobile from './NavMobile';
import NavDesktop from './NavDesktop';
import {  useSelector } from 'react-redux';

const Navbar = () => {
    const { isSmallScreen } = useSelector((state) => state.layout);

    useEffect(() => {
        console.log(` SmallScreen Status : ${isSmallScreen}`);
    }, [isSmallScreen]);

    return <>{isSmallScreen ? <NavMobile /> : <NavDesktop />}</>;
};

export default Navbar;
