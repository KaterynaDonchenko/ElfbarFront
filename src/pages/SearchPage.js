import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { setSearch } from "../components/search/SearchSlice";
import { setCurrentPage } from "../components/pagination/PaginationSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import ProductList from "../components/productList/ProductList";
import TitleH1 from "../components/titleH1/TitleH1";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";
import Pagination from "../components/pagination/Pagination";

const SearchPage = () => {
    const { search, searchResultForSearchPage, serchResultLoadingStatus } = useSelector(state => state.search);
    const { currentPage, currentPageData } = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = useLocation();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(setCurrentPage(0));
        window.scrollTo(0, 0);
    }, [searchResultForSearchPage]);

    useEffect(() => {
        dispatch(changeMobileMenuDisplay('none'));
    }, []);

    useEffect(() => {
        const newParam = url.search.includes('&') ? url.search.slice(0, url.search.indexOf('&')).replace(/%20/g, '+') 
                                                    : 
                                                    url.search.replace(/%20/g, '+');

        navigate(`/search/${newParam}&page=${currentPage + 1}`, { replace: true });

    }, [search, currentPage]);


    return (
        <div className="main-content" style={{'backgroundColor': 'rgb(246,246,246)'}}>
            <div className="main-content__header" style={{'backgroundColor': 'rgb(251, 242, 251)'}}>
                <div className="container">
                    <TitleH1 title='Результат пошуку' classN='title-h1_pdt150 title-h1_center title-h1_fz-50'/>
                </div>
            </div>
            <div className="container">
                <BreadCrumbs/>
                <ProductList productsArray={currentPageData}/>
                {!(serchResultLoadingStatus === 'loading') ? <Pagination array={searchResultForSearchPage}/> : null}
            </div>
        </div>
    )
}

export default SearchPage;