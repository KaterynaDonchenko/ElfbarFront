import {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { fetchProducts, fetchProductsCategory } from './ProductListSlice'; 
import { useParams } from 'react-router-dom';

import ProductCard from '../productCard/ProductCard';
import Spiner from '../spinner/Spinner';
import Error from '../error/Error';


const ProductList = ({marker = '', removeMarker}) => {
    const { products, productsLoadingStatus } = useSelector(state => state.products);
    const dispatch = useDispatch();
    const {category} = useParams();

    useEffect(() => {
        category ? dispatch(fetchProductsCategory(category)) : dispatch(fetchProducts());
    }, [category]);

    const renderProductCard = (arr) => {
        if (arr.length !== 0) {
            return arr.map(({_id, title, category, price, img, lable}) => {
                if (removeMarker) lable = ''
                 
                if (marker === lable) {
                    return (
                        <ProductCard 
                            key={_id} 
                            title={title} 
                            category={category} 
                            price={price}
                            img={img} 
                            lable={lable}
                            id={_id}/> 
                    )
                }
            });
        }
    }

    const cardItem = renderProductCard(products) ;
    const spiner = productsLoadingStatus === 'loading' ? <Spiner/> : null;
    const error = productsLoadingStatus === 'error' ? <Error/> : null;
    
    return (
        <>
            {spiner}
            {error}
            <ul className="card-list">
                {cardItem}
            </ul>
        </>
    )
}

export default ProductList;