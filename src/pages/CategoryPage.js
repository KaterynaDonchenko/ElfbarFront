import { useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { setSearch } from "../components/search/SearchSlice";
import { fetchProductsCategory } from "../components/productList/ProductListSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import Pagination from "../components/pagination/Pagination";
import ProductList from "../components/productList/ProductList";
import FilterSlider from "../components/sliders/filterSlider/FilterSlider";
import TitleH1 from "../components/titleH1/TitleH1";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { useTranslation } from "react-i18next";

const CategoryPage = () => {
    const { i18n } = useTranslation()
    const { productsCategory, productsCategoryLoadingStatus, productsCategoryAfterLoading } = useSelector(state => state.products);
    const { currentPage, currentPageData } = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const {category} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProductsCategory({category, language: i18n.language}));
    }, [category, i18n.language, dispatch]);

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay(false));
        window.scrollTo(0, 0);
        document.body.style.overflow = '';
    }, [dispatch]);

    useEffect(() => {
        navigate(`/product-category/${category}?page=${currentPage + 1}`, { replace: true });
    }, [currentPage, category, navigate]);

    const renderProducts = () => {
        return (
            <>
                <ErrorBoundary>
                    <ProductList productsArray={currentPageData} statusProductsArray={productsCategoryLoadingStatus}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    {!(productsCategoryLoadingStatus === 'loading') ? <Pagination array={productsCategory}/> : null}
                </ErrorBoundary> 
            </> 
        )
    }
    
    const products = renderProducts();
    const warning = productsCategoryAfterLoading === 'empty' ? <EmptyProductList/> : null;
    const content = !warning ? products : null;
    return (
        <div className="main-content" style={{'backgroundColor': 'rgb(246,246,246)'}}>
        <div className="main-content__header" style={{'backgroundColor': 'rgb(251, 242, 251)'}}>
            <div className="container">
                <TitleH1 title={`ELFBAR ${category}`} classN='title-h1_pdt150 title-h1_center title-h1_fz-50'/>
                <ErrorBoundary>
                    <FilterSlider/>
                </ErrorBoundary>
            </div>
        </div>
        <div className="container">
            <ErrorBoundary>
                <BreadCrumbs/>
            </ErrorBoundary>
            {warning}
            {content}
        </div>
    </div>
    )
}

const EmptyProductList = () => {
    return (
        <div className="empty-productlist">
            <div className="empty-productlist__text">
                Товари, які відповідають вашому запиту, не знайдені
            </div>
        </div>
    )
}

export default CategoryPage;

