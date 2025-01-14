import { useSelector, useDispatch } from 'react-redux';
import { fetchFilter, setFilter } from './FilterSlice';
import { useEffect, useRef } from 'react';
import { setCurrentPage } from '../pagination/PaginationSlice';

import './filters.scss';
import { useTranslation } from 'react-i18next';

const Filters = () => {
    const { i18n, t } = useTranslation()
    const { filter } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const selectRef = useRef();

    useEffect(() => {
        sessionStorage.setItem('filter', JSON.stringify(filter));
    }, [filter])

    useEffect(() => {
        dispatch(fetchFilter({filter, language: i18n.language}));
        if (filter === 'all') selectRef.current.value = 'all';

        const filterFromSessionStorage = JSON.parse(sessionStorage.getItem('filter'));
        if (filterFromSessionStorage !== filter) dispatch(setCurrentPage(0));
        
        sessionStorage.setItem('filter', JSON.stringify(filter));
        selectRef.current.value = filter;
    }, [filter, i18n.language, dispatch])

    return (
        <>
            <label htmlFor="orderby">{t("sort.name")}:
                <select onChange={(e) => dispatch(setFilter(e.target.value))} name="orderby" className="filters" ref={selectRef}>
                    <option value="all">{t("sort.all")}</option>
                    <option value="price-incr">{t("sort.cheap")}</option>
                    <option value="price-decr">{t("sort.expensive")}</option>
                    <option value="popularity">{t("sort.top")}</option>
                    <option value="date">{t("sort.new")}</option>
                </select>
            </label>
        </>
    )
}

export default Filters;