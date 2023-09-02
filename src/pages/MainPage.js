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
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const MainPage = () => {
    const { productsTop, productsNew, productsWithLableLoadingStatus } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay(false));
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <MainScreen/>
            <div className="container">
                <TitleH2 title='Категорії' classN='title-h2__filter'/>
                <ErrorBoundary>
                    <FilterSlider/>
                </ErrorBoundary>
                <TitleH2 title='Новинки'/>
                <ErrorBoundary>
                    <ProductList lable='новинка' productsArray={productsNew} statusProductsArray={productsWithLableLoadingStatus}/>
                </ErrorBoundary>
                <TitleH2 title='Популярні товари'/>
                <ErrorBoundary>
                    <ProductList lable='топ' productsArray={productsTop} statusProductsArray={productsWithLableLoadingStatus}/>
                </ErrorBoundary>
                <Advantages/>
                <MainInfo/>
            </div>
        </>
    )
}

export default MainPage;