import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import MainScreen from '../components/mainScreen/MainScreen';
import Filtersl from '../components/filters/Filters';
import ProductList from '../components/productList/ProductList';
import TitleH2 from '../components/titleH2/TitleH2';
import MainInfo from '../components/mainInfo/MainInfo';
import Advantages from '../components/advantages/Advantages';

const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
    }, []);

    return (
        <>
            <MainScreen/>
            <div className="container">
                <Filtersl/>
                <TitleH2 title='Новинки'/>
                <ProductList marker='новинка'/>
                <TitleH2 title='Популярні товари'/>
                <ProductList marker='топ'/>
                <Advantages/>
                <MainInfo/>
            </div>
        </>
    )
}

export default MainPage;