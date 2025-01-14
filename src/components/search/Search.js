import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group'; 

import { fetchSearch, 
         clearSearchResult, 
         setSearch, 
         setSearchResultForSearchPage, 
         changeDisplaySearchResult } from './SearchSlice';
import { setCurrentPage } from '../pagination/PaginationSlice';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './search.scss';
import { useTranslation } from 'react-i18next';

const Search = ({activeClass = null}) => {
    const { i18n, t } = useTranslation()
    const SearchBlockRef = useRef();
    const inputSearchRef = useRef();
    const linkRef = useRef();
    const searchResultElement = useRef();
    const { search, searchResult, SearchResultLoadingStatus, displaySearchResult } = useSelector(state => state.search);
    const dispatch = useDispatch();

    useEffect(() => {
        const imgSearch = document.querySelector('.search__img svg');

        const onShowSearchInput = () => {
            if (window.innerWidth < 1200) document.querySelector('.header__menu').classList.toggle('header__menu_left');
            SearchBlockRef.current.classList.toggle('search_active');
            inputSearchRef.current.classList.toggle('search__line_active');
            dispatch(changeDisplaySearchResult(true));
            SearchBlockRef.current.classList.contains('search_active') ? inputSearchRef.current.focus() : 
                                                                        inputSearchRef.current.blur();
        }

        imgSearch.addEventListener('click', onShowSearchInput);

        const onHiddenSearch = event => {

            if (event.target !== imgSearch && event.target !== inputSearchRef.current ) { 
                SearchBlockRef.current.classList.remove('search_active');
                inputSearchRef.current.classList.remove('search__line_active');
                dispatch(setSearch(''));
            }
        };

        window.addEventListener('click', onHiddenSearch);

        return () => {
            imgSearch.removeEventListener('click', onShowSearchInput)
            window.removeEventListener('click', onHiddenSearch);
        }
    }, [dispatch])

    useEffect(() => {
        search.length > 2 ? dispatch(fetchSearch({search, language: i18n.language})) : dispatch(clearSearchResult());
    }, [search, i18n.language, dispatch]);

    useEffect(() => {
        let mobileMenu = document.querySelector('.header__mobile-menu-block');
        let mobileList = document.querySelector('.header__mobile-menu-list');
        
        if ((searchResult.length > 0 || search.length > 2) && window.getComputedStyle(mobileMenu).display === 'grid') {
            mobileList.style.paddingTop = `${searchResultElement.current.offsetHeight}px`;
        } else {
            mobileList.style.paddingTop = '';
        }

        return () => {
            mobileMenu = null;
            mobileList = null;
        };

    }, [searchResult, search.length])


    const highlightText = (text) => {
        const positionOfTheFirstLetter = text.toLowerCase().indexOf(search.toLowerCase());
        const beforeText = text.slice(0, positionOfTheFirstLetter);
        const afterText = text.slice(positionOfTheFirstLetter + search.length);
        const cuttingText = text.slice(positionOfTheFirstLetter, positionOfTheFirstLetter + search.length);

        return {
            beforeText,
            afterText,
            cuttingText
        }
    } 

    const renderSearchResult = (arr) => {
        if (arr.length > 0) {
            const items = arr.map(({_id, img, title}, i) => {
                const newTitle = highlightText(title.slice(0, 56));

                return (
                    <li key={i} className="search__result-item">
                        <Link to={`/product/${_id}`} className="search__result-link">
                            <img src={`http://localhost:3001/${img}`} alt={title} />
                            <div className="search__result-info">
                                <div className="search__result-title">
                                    {newTitle.beforeText}<strong>{newTitle.cuttingText}</strong>{newTitle.afterText}
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            })

            return (
                <>
                    <ul className="search__result-list">
                        {items}
                    </ul>
                    <div className="search__result-more">
                        <Link onClick={() => {
                              dispatch(setSearchResultForSearchPage(searchResult))
                              dispatch(setCurrentPage(0))
                              }} 
                              to={`/search/?s=${search}`}
                              ref={el => linkRef.current = el}>
                              {t("search.all")}
                        </Link>
                    </div>
                </>
            )
        }

        if (search.length > 2 && arr.length === 0) {
            return (
                <div className="search__result-list">
                    <div className="search__result-list-text">
                        {t("search.no_result")}
                    </div>
                </div>
            )
        }
    }

    const onPressEnter = (e) => {
        if (e.key === 'Enter' && searchResult.length > 0) {
            linkRef.current.click();
            dispatch(changeDisplaySearchResult(true));
        }
    }

    const products = renderSearchResult(searchResult);
    const loading = SearchResultLoadingStatus === 'loading' ? <Spinner/> : null;
    const error = SearchResultLoadingStatus === 'error' ? <Error/> : null;
    const result = !(loading || error) ? products : null;
    return (
        <>
            <div ref={el => SearchBlockRef.current = el} className="search">
                <div className="search__img">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/></svg>
                </div>
                <input 
                        type='text'
                        value={search}
                        onChange={(event) => {
                            dispatch(setSearch(event.target.value))
                        }} 
                        ref={el => inputSearchRef.current = el}
                        onKeyDown={onPressEnter} 
                        className={`search__line ${activeClass}`}/>
            </div>
            {loading}
            <CSSTransition in={displaySearchResult} 
                            timeout={300} 
                            classNames="search__result">
                <div className="search__result" ref={searchResultElement}>
                    {error}
                    {result}
                </div>
            </CSSTransition>
        </>
    )
}



export default Search;