import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { setSearch } from "../components/search/SearchSlice";
import { setFilter } from "../components/filters/FilterSlice";
import { setCurrentPage } from "../components/pagination/PaginationSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import { changeDispalayCartWidget } from "../components/cartWidget/CartWidgetSlice";
import ProductList from "../components/productList/ProductList";
import Filters from "../components/filters/Filters";
import FilterSlider from "../components/sliders/filterSlider/FilterSlider";
import TitleH1 from "../components/titleH1/TitleH1";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";
import Pagination from "../components/pagination/Pagination";


const CatalogPage = () => {
    const { filter, filterLoadingStatus, filterResult } = useSelector(state => state.filter);
    const { currentPage, currentPageData } = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(setFilter('all'));
        dispatch(setCurrentPage(0));
        dispatch(changeMobileMenuDisplay('none'));
        dispatch(changeDispalayCartWidget('none'));
    }, []);

    useEffect(() => {
        navigate(`/catalog/filter?orderby=${filter}&page=${currentPage + 1}`, { replace: true });
    }, [filter, currentPage]);

    return (
        <div className="main-content" style={{'backgroundColor': 'rgb(246,246,246)'}}>
            <div className="main-content__header" style={{'backgroundColor': 'rgb(251, 242, 251)'}}>
                <div className="container">
                    <TitleH1 title='Каталог товарів' classN='title-h1_pdt150 title-h1_center title-h1_fz-50'/>
                    <FilterSlider/>
                </div>
            </div>
            <div className="container">
                <div style={{'display': 'flex', 'justifyContent': 'space-between'}} className="main-content__wrapper">
                    <BreadCrumbs/>
                    <Filters/>
                </div>
                <ProductList productsArray={currentPageData} statusProductsArray={filterLoadingStatus}/>
                { !(filterLoadingStatus === 'loading') ? <Pagination array={filterResult}/> : null}
            </div>
        </div>
    )
}

export default CatalogPage;