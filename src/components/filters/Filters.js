import { useSelector, useDispatch } from 'react-redux';
import { fetchFilter, setFilter } from './FilterSlice';
import { useEffect } from 'react';

import './filters.scss';

const Filters = () => {
    const { filter } = useSelector(state => state.filter);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFilter(filter))
    }, [filter])

    return (
        <>
            <label htmlFor="orderby">Сортувати:
                <select onChange={(e) => dispatch(setFilter(e.target.value))} name="orderby" className="filters">
                    <option value="all">Всі товари</option>
                    <option value="price-incr">Від дешевих до дорогих</option>
                    <option value="price-decr">Від дорогих до дешевих</option>
                    <option value="popularity">Топ продажів</option>
                    <option value="date">Спочатку нові надходження</option>
                </select>
            </label>
        </>
    )
}

export default Filters;