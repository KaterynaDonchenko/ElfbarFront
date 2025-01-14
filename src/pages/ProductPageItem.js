import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import Product from "../components/product/Product";
import TitleH2 from "../components/titleH2/TitleH2";
import ProductSlider from "../components/sliders/productSlider/ProductSlider";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { useTranslation } from "react-i18next";

const ProductPageItem = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay(false));
        window.scrollTo(0, 0);
        document.body.style.overflow = '';
    }, []);

    return (
        <>
            <ErrorBoundary>
                <Product/>
            </ErrorBoundary>
            <div className="container">
                <TitleH2 title={t("product_page.same_products")}/>
                <ErrorBoundary>
                    <ProductSlider/>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default ProductPageItem;