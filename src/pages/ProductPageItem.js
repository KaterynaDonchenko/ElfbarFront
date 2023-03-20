import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import Product from "../components/product/Product";
import TitleH2 from "../components/titleH2/TitleH2";
import ProductSlider from "../components/sliders/productSlider/ProductSlider";

const ProductPageItem = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
    }, []);

    return (
        <>
            <Product/>
            <div className="container">
                <TitleH2 title='Cхожі товари'/>
                <ProductSlider/>
            </div>
        </>
    )
}

export default ProductPageItem;