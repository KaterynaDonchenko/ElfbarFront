import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import { fetchSearch, cleareSearchResult, setSearch, setSearchItemsForSearchPage } from './SearchSlice';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './search.scss';

const Search = () => {
    const serchBlockRef = useRef();
    const inputSearchRef = useRef();
    const linkRef = useRef();
    const { search, searchResult, serchLoadingStatus } = useSelector(state => state.search);
    const dispatch = useDispatch();
    const url = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const newParam = url.search.replace(/%20/g, '+');
        if (newParam !== url.search) navigate(`/search/${newParam}`, { replace: true });
        
    }, [url.search]);

    const onShowSearchInput = () => {
        serchBlockRef.current.classList.toggle('search_active');
        inputSearchRef.current.classList.toggle('search__line_active');
        serchBlockRef.current.classList.contains('search_active') ? inputSearchRef.current.focus() : inputSearchRef.current.blur();
    }

    useEffect(() => {
        search.length > 1 ? dispatch(fetchSearch(search)) : dispatch(cleareSearchResult());
    }, [search])


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
                        <Link onClick={() => dispatch(setSearchItemsForSearchPage(searchResult))} 
                              to={`/search/?s=${search}`}
                              ref={el => linkRef.current = el}>
                              Всі результати
                        </Link>
                    </div>
                </>
            )
        }

        if (search.length > 1 && arr.length == 0) {
            return (
                <div className="search__result-list">
                    <div className="search__result-list-text">
                        Товарів за данним критерієм не знайдено
                    </div>
                </div>
            )
        }
    }


    const loading = serchLoadingStatus === 'loading' ? <Spinner/> : null;
    const error = serchLoadingStatus === 'error' ? <Error/> : null;
    const result = renderSearchResult(searchResult);
    return (
        <>
            <div ref={el => serchBlockRef.current = el} className="search">
                <div onClick={onShowSearchInput} className="search__img">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/></svg>
                </div>
                <input 
                        type='text'
                        value={search}
                        onChange={(event) => {
                            dispatch(setSearch(event.target.value))
                        }} 
                        ref={el => inputSearchRef.current = el}
                        onKeyDown={e => e.key === 'Enter' ? linkRef.current.click(): null} 
                        className="search__line"/>
            </div>
            <div className="search__result">
                {loading}
                {error}
                {result}
            </div>
        </>
    )
}



export default Search;