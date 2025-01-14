import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { changeDisplayCartWidget, changeTotal, removeProductFromTheCart, fetchArrayOfProducts } from './CartWidgetSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 

import './cartWidget.scss';

import emptyCart from '../../assets/icons/empty-cart.svg';
import { useTranslation } from 'react-i18next';

const CartWidget = () => {
    const { i18n ,t } = useTranslation()
    const { widgetDisplay, userProductCart } = useSelector(state => state.cartWidget);
    const dispatch = useDispatch();

    const totalSumCart = userProductCart.length > 0 ? userProductCart.reduce((sum, item) => sum + item.price * item.counter, 0) : 0;

    useEffect(() => {
        const cartWidget = document.querySelector('.cart-widget');

        const hiddenCartWidget = event => {
            if (event.target === cartWidget || event.keyCode === 27) dispatch(changeDisplayCartWidget(false));
        }

        window.addEventListener('click', hiddenCartWidget);
        window.addEventListener('keydown', hiddenCartWidget);

        return() => {
            window.removeEventListener('click', hiddenCartWidget);
            window.removeEventListener('keydown', hiddenCartWidget);
        }
    }, [widgetDisplay])

    useEffect(() => {
        const existingLocalStorage = JSON.parse(localStorage.getItem('userProductCart')) || [];
        const idArrayFromLocalStorage = existingLocalStorage.map(item => item.id);
        dispatch(fetchArrayOfProducts({arr: idArrayFromLocalStorage, language: i18n.language}));
    }, [i18n.language])
    
    useEffect(() => {
        if (totalSumCart <= 0) dispatch(changeCartIconDisplay(false));
        dispatch(changeTotal(totalSumCart));
    }, [totalSumCart]);

    const list = userProductCart.length > 0 ? <ProductList userProductCart={userProductCart} /> : <EmptyCart/>;
    return (
        <CSSTransition in={widgetDisplay} 
                       timeout={400} 
                       classNames="cart-widget">
            <div className="cart-widget">
                <CSSTransition in={widgetDisplay} 
                               timeout={400} 
                               classNames="cart-widget__wrapper">
                    <div className="cart-widget__wrapper">
                        <div className="cart-widget__header">
                            <div className="cart-widget__title">{t("cart_widget.cart")}</div>
                            <div onClick={() => {dispatch(changeDisplayCartWidget(false)); document.body.style.overflow = ''}} 
                                 className="cart-widget__close">{t("cart_widget.close")}</div>
                        </div>
                        {list}
                    </div>
                </CSSTransition>
            </div>
        </CSSTransition>
    )
}

const ProductList = ({userProductCart}) => {
    const { t } = useTranslation()
    const { total } = useSelector(state => state.cartWidget);
    const dispatch = useDispatch();

    return (
        <>
            <div className="cart-widget__content">
                <ul className="cart-widget__product-list">
                    {
                        userProductCart.map(({img, title, price, counter, _id}, i) => {
                            return (
                                <li key={i} className="cart-widget__product-item">
                                    <Link to={`/product/${_id}`} className="cart-widget__product-link">
                                        <img src={`http://localhost:3001/${img}`} alt={title} className="cart-widget__product-img" />
                                        <div className="cart-widget__product-info">
                                            <div className="cart-widget__product-title">{title.slice(0, 50)}</div>
                                            <div className="cart-widget__product-quantity"><span> {counter} x </span> {price.toFixed(2)} {t("currency")}</div>
                                        </div>
                                    </Link>
                                    <div onClick={() => dispatch(removeProductFromTheCart(_id))} 
                                         className="cart-widget__product-close">
                                    </div>
                                </li> 
                            )
                        })
                    }
                </ul>
            </div>
            <div className="cart-widget__footer">
                <div className="cart-widget__total">
                    <span>{t("cart_widget.total")}:</span>
                    <span>{total.toFixed(2)} {t("currency")}</span> 
                </div>
                <div className="cart-widget__buttons">
                    <Link to='/cart' 
                          onClick={() => {dispatch(changeDisplayCartWidget(false))}} 
                          className="btn">
                          {t("cart_widget.view_cart")}
                    </Link>
                    <Link to='/checkout' 
                          onClick={() => {dispatch(changeDisplayCartWidget(false))}} 
                          className="btn"> 
                          {t("cart_widget.place_order")}
                    </Link>
                </div>
            </div>
        </>
    )
}

const EmptyCart = () => {
    const { t } = useTranslation()
    return (
        <div className="cart-widget__empty-cart">
            <img src={emptyCart} alt="the empty cart" />
            <div className="cart-widget__empty-cart-text">{t("cart_widget.empty")}</div>
            <Link to={`/catalog/filter?orderby=all&page=1`} className="btn">{t("cart_widget.to_catalog")}</Link>
        </div>
    )
}

export default CartWidget;