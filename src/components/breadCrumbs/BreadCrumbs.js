import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setFilter } from "../filters/FilterSlice";
import { setCurrentPage } from '../pagination/PaginationSlice';

import './breadCrumbs.scss';

const BreadCrumbs = () => {
    const { pathname, search } = useLocation();
    const { product } = useSelector(state => state.product);
    const dispatch = useDispatch();

    const goToCatalog = () => {
        dispatch(setFilter('all'));
        dispatch(setCurrentPage(0));
    }

    const setCategoryBreadCrumbs = () => {
        const model = pathname.slice(-((pathname.length - pathname.indexOf('y/')) - 2));
        const nameLink = pathname.includes('/catalog') ? 'Каталог товарів' : pathname === '/search/' ?  
        `Результат пошуку для "${search.slice(search.indexOf('=') + 1, search.indexOf('&')).replace(/\+/ig, ' ')}"` : `ELFBAR ${model}`;
        if (nameLink === 'Каталог товарів') {
            return (
                <span className="breade-crumbs__link breade-crumbs__link_active">{nameLink}</span>
            )
        } else {
            return (
                <>
                    <Link to={`/catalog/filter?orderby=all&page=1`} onClick={goToCatalog} className="breade-crumbs__link">Каталог товарів</Link>
                    <span className="breade-crumbs__link breade-crumbs__link_active">{nameLink}</span>
                </>
            )
        }
    }

    const setProductBreadCrumbs = ({title, category, categoryUrl}) => {
        return (
            <>
                <Link to={`/product-category/${categoryUrl}`} className="breade-crumbs__link">{category}</Link>
                <span className="breade-crumbs__link breade-crumbs__link_active">{title}</span>
            </>
        )
    }

    const breadcrumbs = pathname.includes('/product/') ? setProductBreadCrumbs(product) : setCategoryBreadCrumbs(); 
    return (
        <nav className="breade-crumbs">
            <Link to='/' className="breade-crumbs__link">Головна</Link>
            {breadcrumbs}
        </nav>
    )
        
}

export default BreadCrumbs;