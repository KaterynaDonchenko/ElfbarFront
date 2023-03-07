import {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
 import { useParams } from 'react-router-dom';

import { fetchProducts, fetchProductsCategory } from './ProductListSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 
import ProductCard from '../productCard/ProductCard';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './productList.scss';

const ProductList = ({marker = '', removeMarker}) => {
    const { products, productsLoadingStatus } = useSelector(state => state.products);
    const { userProductCart } = useSelector( state => state.productCard);
    const dispatch = useDispatch();
    const {category} = useParams();

    useEffect(() => {
        category ? dispatch(fetchProductsCategory(category)) : dispatch(fetchProducts());
    }, [category]);

    if (userProductCart.length > 0) dispatch(changeCartIconDisplay('block'));

    const renderProductCard = (arr) => {
        if (arr.length !== 0) {
            return arr.map(({_id, title, category, price, img, lable, categoryUrl}) => {
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
                            _id={_id}
                            categoryUrl={categoryUrl}/> 
                    )
                }
            });
        }
    }

    const cardItem = renderProductCard(products) ;
    const spiner = productsLoadingStatus === 'loading' ? <Spinner/> : null;
    const error = productsLoadingStatus === 'error' ? <Error/> : null;
    const content = products.length > 0 ? <ul className="card-list">{cardItem}</ul> : null;
    
    return (
        <>
            {spiner}
            {error}
            {content}
        </>
    )
}


export default ProductList;