import { useParams } from "react-router-dom";

import ProductList from "../components/productList/ProductList";
import Filters from "../components/filters/Filters";
import TitleH1 from "../components/titleH1/TitleH1";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";

const CategoryPage = () => {
    const {category} = useParams();

    return (
        <div className="main-content" style={{'backgroundColor': 'rgb(246,246,246)'}}>
        <div className="main-content__header" style={{'backgroundColor': 'rgb(251, 242, 251)'}}>
            <div className="container">
                <TitleH1 title={`ELFBAR ${category}`} classN='title-h1_pdt150 title-h1_center title-h1_fz-50'/>
                <Filters/>
            </div>
        </div>
        <div className="container">
            <BreadCrumbs/>
            <ProductList removeMarker={true}/>
        </div>
    </div>
    )
}

export default CategoryPage;