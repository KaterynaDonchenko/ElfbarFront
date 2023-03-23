import { useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import ProductList from "../components/productList/ProductList";
import FilterSlider from "../components/sliders/filterSlider/FilterSlider";
import TitleH1 from "../components/titleH1/TitleH1";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";

const CategoryPage = () => {
    const {category} = useParams();
    const { products } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
    }, []);

    const content = <ProductList removeMarker={true}/>;
    const warning = products.length <= 0 ? <EmptyProductList/> : null    

    return (
        <div className="main-content" style={{'backgroundColor': 'rgb(246,246,246)'}}>
        <div className="main-content__header" style={{'backgroundColor': 'rgb(251, 242, 251)'}}>
            <div className="container">
                <TitleH1 title={`ELFBAR ${category}`} classN='title-h1_pdt150 title-h1_center title-h1_fz-50'/>
                <FilterSlider/>
            </div>
        </div>
        <div className="container">
            <BreadCrumbs/>
            {content}
            {warning}
        </div>
    </div>
    )
}

const EmptyProductList = () => {
    return (
        <div className="empty-productlist">
            <div className="empty-productlist__text">
                Товарів, які відповідають вашому запиту, не знайдені
            </div>
        </div>
    )
}

export default CategoryPage;

