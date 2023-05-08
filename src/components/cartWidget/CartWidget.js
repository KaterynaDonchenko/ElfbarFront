import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { changeDispalayCartWidget, changeTotal } from './CartWidgetSlice';
import { removeProductFromTheCart } from '../productCard/ProductCartSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 

import './cartWidget.scss';

import emptyCart from '../../assets/icons/empty-cart.svg';

const CartWidget = () => {
    const { widgetDisplay } = useSelector(state => state.cartWidget);
    const { userProductCart } = useSelector( state => state.productCard);
    const dispatch = useDispatch();

    const totalSumCart = userProductCart.length > 0 ? userProductCart.reduce((sum, item) => sum + item.price * item.counter, 0) : 0;

    useEffect(() => {
        if (totalSumCart <= 0) dispatch(changeCartIconDisplay('none'));
        dispatch(changeTotal(totalSumCart));
    }, [totalSumCart]);

    const list = userProductCart.length > 0 ? <ProductList userProductCart={userProductCart} /> : <EmptyCart/>;
    return (
        <div className="cart-widget" style={{'display': widgetDisplay}}>
            <div className="cart-widget__wrapper">
                <div className="cart-widget__header">
                    <div className="cart-widget__title">Кошик</div>
                    <div onClick={() => dispatch(changeDispalayCartWidget('none'))} className="cart-widget__close">Закрити</div>
                </div>
                {list}
            </div>
        </div>
    )
}

const ProductList = ({userProductCart}) => {
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
                                            <div className="cart-widget__product-quantity"><span> {counter} x </span> {price} грн</div>
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
                    <span>Разом:</span>
                    <span>{total} грн</span> 
                </div>
                <div className="cart-widget__buttons">
                    <Link to='/cart' 
                          onClick={() => {dispatch(changeDispalayCartWidget('none'))}} 
                          className="btn">
                          Переглянути кошик
                    </Link>
                    <Link to='/checkout' 
                          onClick={() => {dispatch(changeDispalayCartWidget('none'))}} 
                          className="btn"> 
                          Оформити замовлення
                    </Link>
                </div>
            </div>
        </>
    )
}

const EmptyCart = () => {
    return (
        <div className="cart-widget__empty-cart">
            <img src={emptyCart} alt="the empty cart" />
            <div className="cart-widget__empty-cart-text">НЕМАЄ ТОВАРІВ В КОШИКУ</div>
            <Link to={`/catalog/filter?orderby=all&page=1`} className="btn">До каталогу</Link>
        </div>
    )
}

export default CartWidget;