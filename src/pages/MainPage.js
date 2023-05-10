import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import MainScreen from '../components/mainScreen/MainScreen';
import FilterSlider from "../components/sliders/filterSlider/FilterSlider";
import ProductList from '../components/productList/ProductList';
import TitleH2 from '../components/titleH2/TitleH2';
import MainInfo from '../components/mainInfo/MainInfo';
import Advantages from '../components/advantages/Advantages';

const MainPage = () => {
    const { productsTop, productsNew, productsWithLableLoadingStatus } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay('none'));
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <MainScreen/>
            <div className="container">
                <FilterSlider/>
                <TitleH2 title='Новинки'/>
                <ProductList lable='новинка' productsArray={productsNew} statusProductsArray={productsWithLableLoadingStatus}/>
                <TitleH2 title='Популярні товари'/>
                <ProductList lable='топ' productsArray={productsTop} statusProductsArray={productsWithLableLoadingStatus}/>
                <Advantages/>
                <MainInfo/>
            </div>
        </>
    )
}

export default MainPage;