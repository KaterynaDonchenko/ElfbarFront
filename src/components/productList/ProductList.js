import {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';

import {fetchProductsWithTheLabel } from './ProductListSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 
import ProductCard from '../productCard/ProductCard';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './productList.scss';
import { useTranslation } from 'react-i18next';

const ProductList = ({label = false, productsArray, statusProductsArray}) => {
    const { i18n } = useTranslation() 
    const { userProductCart } = useSelector( state => state.cartWidget);
    const dispatch = useDispatch();

    useEffect(() => {
        if (label) dispatch(fetchProductsWithTheLabel({label, language: i18n.language}))
    }, [i18n.language, dispatch, label]);


    useEffect(() => {
        if (userProductCart.length > 0) dispatch(changeCartIconDisplay(true));
    }, [userProductCart, dispatch])

    const renderProductCard = (arr, label = null) => {
        if (arr.length !== 0) {
            return arr.map(({_id, title, category, price, img, categoryUrl}) => {
                return (
                    <ProductCard 
                        key={_id} 
                        title={title} 
                        category={category} 
                        price={price}
                        img={img} 
                        label={label}
                        _id={_id}
                        categoryUrl={categoryUrl}/> 
                )
            });
        }
    }

    const cardItem = renderProductCard(productsArray, label)
    const spinner = statusProductsArray === 'loading' ? <Spinner/>  : null;
    const error = statusProductsArray === 'error' ? <Error/> : null;
    const content = !(spinner || error ) ? <ul className="card-list">{cardItem}</ul> : null;
    
    return (
        <>
            {spinner}
            {error}
            {content}
        </>
    )
}


export default ProductList;