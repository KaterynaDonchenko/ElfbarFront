import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import ProductList from "../components/productList/ProductList";
import TitleH1 from "../components/titleH1/TitleH1";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";

const SearchPage = () => {
    const { searchItemsForSearchPage } = useSelector(state => state.search);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
    }, [searchItemsForSearchPage]);


    return (
        <div className="main-content" style={{'backgroundColor': 'rgb(246,246,246)'}}>
            <div className="main-content__header" style={{'backgroundColor': 'rgb(251, 242, 251)'}}>
                <div className="container">
                    <TitleH1 title='Результат пошуку' classN='title-h1_pdt150 title-h1_center title-h1_fz-50'/>
                </div>
            </div>
            <div className="container">
                <BreadCrumbs/>
                <ProductList removeMarker={true} search={searchItemsForSearchPage}/>
            </div>
        </div>
    )
}

export default SearchPage;