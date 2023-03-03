import { useParams, Link, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, fetchCategoryInfo} from './ProductSlice';
import { fetchProductsCategory } from '../productList/ProductListSlice';
import { saveUserProductCart } from '../productCard/ProductCartSlice';

import ProductCounter from '../productCounter/ProductCounter';
import Spiner from '../spinner/Spinner';
import Error from '../error/Error';
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import BreadCrumbsMenu from '../breadeCrumbsMenu/BreadCrumbsMenu';

import './product.scss';

const Product = () => {
    const { productLoadingStatus, categoryInfoLoadingStatus } = useSelector(state => state.product);

    const spinerMain = productLoadingStatus === 'loading' ? <Spiner/> : null;
    const spinerBottom = categoryInfoLoadingStatus === 'loading' ? <Spiner/> : null;
    const errorMain = productLoadingStatus === 'error' ? <Error/> : null;
    const errorBottom = categoryInfoLoadingStatus === 'error' ? <Error/> : null;
    return (
        <section className="product">
            <div className="product__main">
                <div className="container">
                    {spinerMain}
                    {errorMain}
                    <ProductMain/>
                </div>
            </div>
            <div className="product__bottom">
                <div className="container">
                    {spinerBottom}
                    {errorBottom}
                    <ProductBottom/>
                </div>
            </div>
        </section>
    )
}

const ProductMain = () => {
    const { productId } = useParams();
    const { product } = useSelector(state => state.product);
    const { products, productsLoadingStatus } = useSelector(state => state.products);
    const { counter } = useSelector(state => state.productCounter)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [productId]);

    useEffect(() => {
        dispatch(fetchProductsCategory(product.categoryUrl));
    }, [product.category]);

    useEffect(() => {
        dispatch(fetchCategoryInfo(product.category));
    }, [product.category]);

    const onChangePage = (event) => {
        if (event.target.value !== '') navigate(event.target.value)
    } 

    const renderSelect = (arr) => {
        const options = arr.map(item => {
            return (
                <option key={item._id} value={`/product/${item._id}`}>{item.taste}</option>
            )
        })

        return (
            <select value={`/product/${productId}`} name="taste" className="product__taste" onChange={onChangePage}>
                {options}
            </select> 
        )
    }

    const selectBlock = renderSelect(products)
    const {title, price, quantity, category, img, dscr, categoryUrl} = product;
    return (
        <div className="product__wrapper">
            <div className="product__img">
            <img src={`http://localhost:3001/${img}`} alt={title} />
            </div>
            <div className="product__right-block">
                <div className="product__breadecrums">
                    <BreadCrumbs/>
                    <BreadCrumbsMenu/>
                </div>
                <h1 className="product__name">{title}</h1>
                <div className="product__price">{price} грн</div>
                <div className="product__dscr">{dscr}</div>
                {selectBlock}
                <div className="product__amount">{quantity}</div>
                <form action="" className="product__form">
                    <ProductCounter/>
                    <button onClick={(e) => {e.preventDefault(); dispatch(saveUserProductCart({id : productId, title, price, img, counter}))}} className="product__form-button">Додати в кошик</button>
                </form>
                <div className="product__category">
                    <span>Категорія:</span> 
                    <Link to={`/product-category/${categoryUrl}`}>{category}</Link>
                </div>
            </div>
        </div>
    )
}

const ProductBottom = () => {
    const { categoryInfo, characteristic } = useSelector(state => state.product);

    const renderCharacteristic = (info, characteristic) => {
        return characteristic.map(({icon, title}, i) => {
            return (
                <div key={i} className="product__info-item">
                    <img src={`http://localhost:3001/${icon}`} alt={title} className="product__info-item-img" />
                    <div className="product__info-item-rightblock">
                        <div className="product__info-item-title">{title}</div>
                        <div className="product__info-item-subtitle">{info ? Object.values(info)[i] : null}</div>
                    </div>
                </div>
            )
        })
    }

    const {info, dscr, additionalInfo} = categoryInfo;
    const characteristicBlock = renderCharacteristic(info, characteristic);

    return (
        <div className="product__bottom">
            <div className="product__bottom-title">Опис</div>
            {additionalInfo ? <div className="product__additional-info">{additionalInfo}</div> : null}
            <div className="product__info">
                {characteristicBlock}
            </div>
            <div className="product__dscr">{dscr}</div> 
        </div>
    )
}

export default Product;

