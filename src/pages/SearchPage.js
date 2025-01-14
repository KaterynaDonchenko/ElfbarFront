import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { setSearch, 
         fetchSearch, 
         setSearchResultForSearchPage, 
         clearSearchResult, 
         changeDisplaySearchResult } from "../components/search/SearchSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import ProductList from "../components/productList/ProductList";
import TitleH1 from "../components/titleH1/TitleH1";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";
import Pagination from "../components/pagination/Pagination";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { useTranslation } from "react-i18next";

const SearchPage = () => {
    const { i18n, t } = useTranslation()
    const { search, 
            searchResultForSearchPage, 
            SearchResultLoadingStatus, 
            searchResult} = useSelector(state => state.search);
    const { currentPage, currentPageData } = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = useLocation();

    useEffect(() => {
        dispatch(setSearch(''));
        window.scrollTo(0, 0);
    }, [searchResultForSearchPage]);

    useEffect(() => {
        dispatch(changeMobileMenuDisplay(false));
        document.body.style.overflow = '';
    }, []);

    useEffect(() => {
        if (search.length === 0) {
            const userSearchFromSessionStorage = JSON.parse(sessionStorage.getItem('userSearch'));
            dispatch(fetchSearch({search: userSearchFromSessionStorage, language: i18n.language}));
        }
    }, []);

    useEffect(() => {
        if (search.length === 0 && searchResult.length > 0 ) {
            dispatch(setSearchResultForSearchPage(searchResult));
            dispatch(changeDisplaySearchResult(true));
        }
    }, [searchResult]);

    useEffect(() => {
        if (search.length === 0 && searchResult.length > 0 && searchResultForSearchPage.length > 0) {
            dispatch(clearSearchResult());
        }
    }, [searchResultForSearchPage]);

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
                    <TitleH1 title={t("search.search_result")} classN='title-h1_pdt150 title-h1_center title-h1_fz-50'/>
                </div>
            </div>
            <div className="container">
                <ErrorBoundary>
                    <BreadCrumbs/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <ProductList productsArray={currentPageData}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    {!(SearchResultLoadingStatus === 'loading') ? <Pagination array={searchResultForSearchPage}/> : null}
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default SearchPage;