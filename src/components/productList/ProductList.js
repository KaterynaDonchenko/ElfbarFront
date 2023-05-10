import {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';

import { fetchProductsWithTheLable } from './ProductListSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 
import ProductCard from '../productCard/ProductCard';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './productList.scss';

const ProductList = ({lable = false, productsArray, statusProductsArray}) => { 
    const { userProductCart } = useSelector( state => state.productCard);
    const dispatch = useDispatch();

    useEffect(() => {
       if(lable) dispatch(fetchProductsWithTheLable(lable));
    }, []);

    useEffect(() => {
        if (userProductCart.length > 0) dispatch(changeCartIconDisplay('block'));
    }, [userProductCart])

    const renderProductCard = (arr, lable = null) => {
        if (arr.length !== 0) {
            return arr.map(({_id, title, category, price, img, categoryUrl}) => {
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
            });
        }
    }

    const cardItem = renderProductCard(productsArray, lable)
    const spiner = statusProductsArray === 'loading' ? <Spinner/>  : null;
    const error = statusProductsArray === 'error' ? <Error/> : null;
    const content = !(spiner || error ) ? <ul className="card-list">{cardItem}</ul> : null;
    
    return (
        <>
            {spiner}
            {error}
            {content}
        </>
    )
}


export default ProductList;