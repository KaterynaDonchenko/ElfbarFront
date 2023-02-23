import ProductList from "../components/productList/ProductList";
import Filters from "../components/filters/Filters";

const CatalogPage = () => {
    return (
        <>
            <div className="container">
                <h1>Каталог товарів</h1>
                <Filters/>
            </div>
            <ProductList removeMarker={true}/>
        </>
    )
}

export default CatalogPage;