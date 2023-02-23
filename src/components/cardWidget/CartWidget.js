import { useSelector } from 'react-redux';
import { hideCartWidget, changeTotal } from './CartWidgetSlice';
import { removeProductFromTheCart } from '../productCard/ProductCartSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 

import './cartWidget.scss';
import emptyCart from '../../assets/icons/empty-cart.svg';

const CartWidget = () => {
    const { widgetDisplay, total } = useSelector(state => state.cartWidget);
    const { userProductCart } = useSelector( state => state.productCard);
    const dispatch = useDispatch();

    const countTotalSumCart = () => {
        const totalSumCart = userProductCart.length > 0 ? userProductCart.reduce((sum, item) => sum + item.price * item.counter, 0) : 0;
        if (totalSumCart <= 0) dispatch(changeCartIconDisplay('none'));
        dispatch(changeTotal(totalSumCart));
    }

    countTotalSumCart();

    const list = userProductCart.length > 0 ? <ProductList userProductCart={userProductCart} /> : <EmptyCart/>;
    return (
        <div className="cart-widget" style={{'display': widgetDisplay}}>
            <div className="cart-widget__wrapper">
                <div className="cart-widget__header">
                    <div className="cart-widget__title">Кошик</div>
                    <div onClick={() => dispatch(hideCartWidget())} className="cart-widget__close">Закрити</div>
                </div>
                <div className="cart-widget__content">
                    {list}
                </div>
                <div className="cart-widget__footer">
                    <div className="cart-widget__total">
                        <span>Разом:</span>
                        <span>{total} грн</span> 
                    </div>
                    <div className="cart-widget__buttons">
                        <NavLink to='/cart' end onClick={() => {dispatch(hideCartWidget())}} className="btn">Переглянути кошик</NavLink>
                        <NavLink to='/checkout' end className="btn"> Оформити замовлення</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProductList = ({userProductCart}) => {
    const dispatch = useDispatch();

    return (
        <ul className="cart-widget__product-list">
            {
                userProductCart.map(({img, title, price, counter, id}, i) => {
                    return (
                        <li key={i} className="cart-widget__product-item">
                            <img src={`http://localhost:3001/${img}`} alt={title} className="cart-widget__product-img" />
                            <div className="cart-widget__product-info">
                                <div className="cart-widget__product-title">{title}</div>
                                <div className="cart-widget__product-quantity"><span> {counter} x </span> {price} грн</div>
                            </div>
                            <div onClick={() => dispatch(removeProductFromTheCart(id))} className="cart-widget__product-close"></div>
                        </li> 
                    )
                })
            }
        </ul>
    )
}

const EmptyCart = () => {
    return (
        <div className="cart-widget__empty-cart">
            <img src={emptyCart} alt="the empty cart" />
            <div className="cart-widget__empty-cart-text">НЕМАЄ ТОВАРІВ В КОШИКУ</div>
            <NavLink to='/catalog' end className="btn">До каталогу</NavLink>
        </div>
    )
}

export default CartWidget;