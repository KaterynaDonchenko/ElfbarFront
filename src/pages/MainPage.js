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
import { useTranslation } from "react-i18next";

const MainPage = () => {
    const { t } = useTranslation()
    const { productsTop, productsNew, productsWithLabelLoadingStatus } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay(false));
        window.scrollTo(0, 0);
        document.body.style.overflow = '';
    }, [dispatch]);

    return (
        <>
            <MainScreen/>
            <div className="container">
                <TitleH2 title={t("section_name.categories")} classN='title-h2__filter'/>
            </div>
            <ErrorBoundary>
                <FilterSlider/>
            </ErrorBoundary>
            <div className="container">
                <TitleH2 title={t("section_name.new")}/>
                <ErrorBoundary>
                    <ProductList label={t("label.new")} productsArray={productsNew} statusProductsArray={productsWithLabelLoadingStatus}/>
                </ErrorBoundary>
                <TitleH2 title={t("section_name.popular")}/>
                <ErrorBoundary>
                    <ProductList label={t("label.top")} productsArray={productsTop} statusProductsArray={productsWithLabelLoadingStatus}/>
                </ErrorBoundary>
                <Advantages/>
                <MainInfo/>
            </div>
        </>
    )
}

export default MainPage;