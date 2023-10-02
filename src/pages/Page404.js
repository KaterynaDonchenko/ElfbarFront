import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import { changeMobileMenuDisplay } from '../components/header/HeaderSlice';
import img404 from '../assets/img/404.png';

import './page404.scss';

const Page404 = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay(false));
        window.scrollTo(0, 0);
        document.body.style.overflow = '';
    }, []);
    
    return (
        <div className='page404'>
            <img className='page404__img' src={img404} alt="error 404"/>
            <div className='page404__title'>Ви потрапили на сторінку, якої не існує</div>
            <Link className='page404__link' to='.'>Повернутися назад</Link>
        </div>
    )
}

export default Page404;