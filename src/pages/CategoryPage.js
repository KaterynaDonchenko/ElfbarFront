import ProductList from "../components/productList/ProductList";
import FilterSlider from "../components/sliders/filterSlider/FilterSlider";

const CategoryPage = () => {
    return (
        <>
            <div className="container">
                <FilterSlider/>
            </div>
            <ProductList removeMarker={true}/>
        </>
    )
}

export default CategoryPage;