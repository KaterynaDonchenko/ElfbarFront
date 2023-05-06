import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import { changeMobileMenuDisplay } from '../components/header/HeaderSlice';
import img404 from '../assets/img/404.png';

const Page404 = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay('none'));
    }, []);
    
    return (
        <div style={{'backgroundColor': '#D84C7E', 'padding': '80px 0 50px'}}>
            <img src={img404} alt="error 404" style={{'display': 'block', 'margin': '0 auto', 'height': '50vh'}}/>
            <div style={{'textAlign': 'center', 'fontWeight': '500', 'fontSize': '40px', 'color': '#fff' }}>Ви потрапили на сторінку, якої не існує</div>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': '500', 'fontSize': '20px', 'marginTop': '10px', 'color': '#000'}} to='.' end>Повернутися назад</Link>
        </div>
    )
}

export default Page404;