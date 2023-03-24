import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { setSearch } from "../components/search/SearchSlice";
import { setFilter } from "../components/filters/FilterSlice";
import ProductList from "../components/productList/ProductList";
import Filters from "../components/filters/Filters";
import FilterSlider from "../components/sliders/filterSlider/FilterSlider";
import TitleH1 from "../components/titleH1/TitleH1";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";
import Pagination from "../components/pagination/Pagination";

const CatalogPage = () => {
    const { filterResult, filter } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(setFilter('all'));
    }, []);

    useEffect(() => {
        navigate(`/catalog/filter?orderby=${filter}`, { replace: true });
    }, [filter]);

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
                <ProductList filter={filterResult}/>
                <Pagination/>
            </div>
        </div>
    )
}

export default CatalogPage;