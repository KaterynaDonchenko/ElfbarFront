import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setFilter } from "../filters/FilterSlice";
import { setCurrentPage } from '../pagination/PaginationSlice';

import './breadCrumbs.scss';


const BreadCrumbs = () => {
    const { t } = useTranslation()
    const { pathname, search } = useLocation();
    const { product } = useSelector(state => state.product);
    const dispatch = useDispatch();

    const goToCatalog = () => {
        dispatch(setFilter('all'));
        dispatch(setCurrentPage(0));
    }

    const setCategoryBreadCrumbs = () => {
        const model = pathname.slice(-((pathname.length - pathname.indexOf('y/')) - 2));
        const nameLink = pathname.includes('/catalog') ? `${t("catalog_bread-crumbs.product_catalog")}` 
        : pathname === '/search/' ?  
        `${t("catalog_bread-crumbs.search")} "${search.slice(search.indexOf('=') + 1, search.indexOf('&')).replace(/\+/ig, ' ')}"` 
        : `${model.replace(/%20/ig, ' ')}`;
        if (nameLink === `${t("catalog_bread-crumbs.product_catalog")}`) {
            return (
                <span className="bread-crumbs__link bread-crumbs__link_active">{nameLink}</span>
            )
        } else {
            return (
                <>
                    <Link to={`/catalog/filter?orderby=all&page=1`} 
                          onClick={goToCatalog} className="bread-crumbs__link">
                        {t("catalog_bread-crumbs.product_catalog")}
                    </Link>
                    <span className="bread-crumbs__link bread-crumbs__link_active">{nameLink}</span>
                </>
            )
        }
    }

    const setProductBreadCrumbs = ({title, category}) => {
        return (
            <>
                <Link to={`/product-category/${category}`} className="bread-crumbs__link">{category}</Link>
                <span className="bread-crumbs__link bread-crumbs__link_active">{title}</span>
            </>
        )
    }

    const breadcrumbs = pathname.includes('/product/') ? setProductBreadCrumbs(product) : setCategoryBreadCrumbs(); 
    return (
        <nav className="bread-crumbs">
            <Link to='/' className="bread-crumbs__link">{t("header.main")}</Link>
            {breadcrumbs}
        </nav>
    )
        
}

export default BreadCrumbs;