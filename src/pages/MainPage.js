import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import MainScreen from '../components/mainScreen/MainScreen';
import FilterSlider from "../components/sliders/filterSlider/FilterSlider";
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
                <FilterSlider/>
                <TitleH2 title='Новинки'/>
                <ProductList lable='новинка'/>
                <TitleH2 title='Популярні товари'/>
                <ProductList lable='топ'/>
                <Advantages/>
                <MainInfo/>
            </div>
        </>
    )
}

// marker='новинка'
//marker='топ'
export default MainPage;