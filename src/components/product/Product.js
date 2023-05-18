import { useParams, Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { fetchProduct, fetchCategoryInfo} from './ProductSlice';
import { fetchProductsCategory } from '../productList/ProductListSlice';
import { saveUserProductCart } from '../cartWidget/CartWidgetSlice';
import { resetCounter } from '../counter/CounterSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice';
import Counter from '../counter/Counter';
import Spiner from '../spinner/Spinner';
import Error from '../error/Error';
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import BreadCrumbsMenu from '../breadeCrumbsMenu/BreadCrumbsMenu';
import TitleH1 from '../titleH1/TitleH1';

import './product.scss';

const Product = () => {
    const { userProductCart } = useSelector( state => state.cartWidget);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userProductCart.length > 0) dispatch(changeCartIconDisplay('block'));
    }, [userProductCart]);

    return (
        <section className="product">
            <div className="product__main">
                <div className="container">
                    <ProductMain/>
                </div>
            </div>
            <div className="product__bottom">
                <div className="container">
                    <ProductBottom/>
                </div>
            </div>
        </section>
    )
}

const ProductMain = () => {
    const { productId } = useParams();
    const { product, productLoadingStatus } = useSelector(state => state.product);
    const { productsCategory, 
            productsCategoryLoadingStatus } = useSelector(state => state.products);
    const { counter } = useSelector(state => state.counter);
    const dispatch = useDispatch();
    const [showSelect, setShowSelect] = useState(false);
    const [rotateArrow, setRotateArrow] = useState(false);

    useEffect(() => {
        dispatch(fetchProduct(+productId));
        dispatch(resetCounter());
        window.scrollTo(0, 0);
    }, [+productId]);

    useEffect(() => {
        dispatch(fetchProductsCategory(product.categoryUrl));
    }, [product.category]);

    useEffect(() => {
        dispatch(fetchCategoryInfo(product.category));
    }, [product.category]);

    const onToggleDropdown = () => {
        setShowSelect(!showSelect);
        setRotateArrow(!rotateArrow);
    }

    const renderSelect = (arr) => {
        let mainVariant;
        const variants = arr.map((item, i) => {
            if (item._id === +productId) {
                mainVariant = <div key={i} onClick={onToggleDropdown} 
                                   className="product__select-mainvariant">
                                   {item.taste.slice(0, 18)}
                               </div>
            }
            else {
                return (
                    <div key={i} className="product__select-variant">
                        <Link key={item._id} to={`/product/${item._id}`}>{item.taste}</Link>
                    </div>
                )
            }

        });

        return (
            <>
                <CSSTransition in={rotateArrow} 
                               timeout={300} 
                               classNames="arrow-select">
                    <div className="product__select-btn"></div>
                </CSSTransition>
                    {mainVariant}
                <CSSTransition in={showSelect} 
                               timeout={300} 
                               unmountOnExit 
                               mountOnEnter
                               classNames="select">
                                
                    <div className="product__select-variants">{variants}</div>
                </CSSTransition>
            </>
        )
    }

    const renderMainContentForTheProduct = () => {
        const spinerSelector = productsCategoryLoadingStatus === 'loading' ? <Spiner/> : null;
        const errorSelector = productsCategoryLoadingStatus === 'error' ? <Error/> : null;
        const selectBlock = !(spinerSelector && errorSelector)? renderSelect(productsCategory) : null;
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
                    <TitleH1 title={title} classN='product__name'/>
                    <div className="product__price">{price} грн</div>
                    <div className="product__dscr">{dscr}</div>
                    <div name="taste" className="product__select">
                        {spinerSelector}
                        {errorSelector}
                        {selectBlock}
                    </div> 
                    <div className="product__amount">{quantity}</div>
                    <form action="" className="product__form">
                        <Counter/>
                        <button onClick={(e) => {
                                e.preventDefault(); 
                                dispatch(saveUserProductCart({_id : +productId, title, price, img, counter}))
                                dispatch(changeCartIconDisplay(true))}} 
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
    
    const spinerMain = productLoadingStatus === 'loading' ? <Spiner clazz='product__spinner'/> : null;
    const errorMain = productLoadingStatus === 'error' ? <Error/> : null;
    const mainContent = !(spinerMain || errorMain) ? renderMainContentForTheProduct() : null;
    return (
        <>
            {spinerMain}
            {errorMain}
            {mainContent}
        </>
    )
}

const ProductBottom = () => {
    const { categoryInfo, characteristic, categoryInfoLoadingStatus } = useSelector(state => state.product);

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

    const renderBottomForTheProduct = () => {
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

    const spinerMain = categoryInfoLoadingStatus === 'loading' ? <Spiner clazz='product__spinner'/> : null;
    const errorMain = categoryInfoLoadingStatus === 'error' ? <Error/> : null;
    const mainContent = !(spinerMain || errorMain) ? renderBottomForTheProduct() : null;
    return (
        <>
            {spinerMain}
            {errorMain}
            {mainContent}
        </>
    )
}

export default Product;

