import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import Product from "../components/product/Product";
import TitleH2 from "../components/titleH2/TitleH2";
import ProductSlider from "../components/sliders/productSlider/ProductSlider";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const ProductPageItem = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay(false));
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <ErrorBoundary>
                <Product/>
            </ErrorBoundary>
            <div className="container">
                <TitleH2 title='Cхожі товари'/>
                <ErrorBoundary>
                    <ProductSlider/>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default ProductPageItem;