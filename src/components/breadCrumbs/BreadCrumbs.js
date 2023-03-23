import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import './breadCrumbs.scss';

const BreadCrumbs = () => {
    const { pathname, search } = useLocation();
    const { product } = useSelector(state => state.product);

    const setCategoryBreadCrumbs = () => {
        const model = pathname.slice(-((pathname.length - pathname.indexOf('y/')) - 2));
        const nameLink = pathname.includes('/catalog') ? 'Каталог товарів' : pathname === '/search/' ?  
        `Результат пошуку для "${search.slice(search.indexOf('=') + 1).replace(/\+/ig, ' ')}"` : `ELFBAR ${model}`;
        return (
            <span className="breade-crumbs__link breade-crumbs__link_active">{nameLink}</span>
        )
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