import { useParams, Link} from 'react-router-dom';
import {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProduct, fetchCategoryInfo} from './ProductSlice';
import { fetchProductsCategory } from '../productList/ProductListSlice';
import { saveUserProductCart } from '../productCard/ProductCartSlice';
import { resetCounter } from '../counter/CounterSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice';
import Counter from '../counter/Counter';
import Spiner from '../spinner/Spinner';
import Error from '../error/Error';
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import BreadCrumbsMenu from '../breadeCrumbsMenu/BreadCrumbsMenu';

import './product.scss';

const Product = () => {
    const { productLoadingStatus, categoryInfoLoadingStatus } = useSelector(state => state.product);
    const { userProductCart } = useSelector( state => state.productCard);
    const dispatch = useDispatch();

    if (userProductCart.length > 0) dispatch(changeCartIconDisplay('block'));

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
    const { counter } = useSelector(state => state.counter);
    const dispatch = useDispatch();
    const selectRef = useRef();
    const arrowRef = useRef();

    useEffect(() => {
        dispatch(fetchProduct(productId));
        dispatch(resetCounter());
    }, [productId]);

    useEffect(() => {
        dispatch(fetchProductsCategory(product.categoryUrl));
    }, [product.category]);

    useEffect(() => {
        dispatch(fetchCategoryInfo(product.category));
    }, [product.category]);

    const onTogleDropdown = (element, arrow) => {
        if (element && arrow) {
            element.classList.toggle('product__select-variants_show');
            arrow.classList.toggle('product__select-btn_rotate');
        }
    }

    const spinerSelector = productsLoadingStatus === 'loading' ? <Spiner/> : null;
    const errorSelector = productsLoadingStatus === 'error' ? <Error/> : null;

    const renderSelect = (arr) => {
        let mainVariant;
        const variants = arr.map(item => {
            if (item._id == productId) {
                mainVariant = <div onClick={() => onTogleDropdown(selectRef.current, arrowRef.current)} 
                                   className="product__select-mainvariant">
                                   {item.taste.slice(0, 18)}
                               </div>
            }
            else {
                return (
                    <div className="product__select-variant">
                        <Link key={item._id} to={`/product/${item._id}`}>{item.taste}</Link>
                    </div>
                )
            }

        });

        return (
            <div name="taste" className="product__select">
                <div className="product__select-btn" ref={el => arrowRef.current = el}></div>
                    {spinerSelector}
                    {errorSelector}
                    {mainVariant}
                <div className="product__select-variants" ref={el => selectRef.current = el}>
                    {variants}
                </div>
            </div> 
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
                    <Counter/>
                    <button onClick={(e) => {
                            e.preventDefault(); 
                            dispatch(saveUserProductCart({_id : productId, title, price, img, counter}))
                            dispatch(changeCartIconDisplay('block'))}} 
                            className="product__form-button">
                            Додати в кошик
                    </button>
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

