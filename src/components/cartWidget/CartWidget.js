import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { hideCartWidget, changeTotal } from './CartWidgetSlice';
import { removeProductFromTheCart } from '../productCard/ProductCartSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 

import './cartWidget.scss';

import emptyCart from '../../assets/icons/empty-cart.svg';

const CartWidget = () => {
    const { widgetDisplay } = useSelector(state => state.cartWidget);
    const { userProductCart } = useSelector( state => state.productCard);
    const dispatch = useDispatch();

    const list = userProductCart.length > 0 ? <ProductList userProductCart={userProductCart} /> : <EmptyCart/>;
    return (
        <div className="cart-widget" style={{'display': widgetDisplay}}>
            <div className="cart-widget__wrapper">
                <div className="cart-widget__header">
                    <div className="cart-widget__title">Кошик</div>
                    <div onClick={() => dispatch(hideCartWidget())} className="cart-widget__close">Закрити</div>
                </div>
                {list}
            </div>
        </div>
    )
}

const ProductList = ({userProductCart}) => {
    const { total } = useSelector(state => state.cartWidget);
    const dispatch = useDispatch();

    const countTotalSumCart = () => {
        const totalSumCart = userProductCart.length > 0 ? userProductCart.reduce((sum, item) => sum + item.price * item.counter, 0) : 0;
        if (totalSumCart <= 0) dispatch(changeCartIconDisplay('none'));
        dispatch(changeTotal(totalSumCart));
    }

    countTotalSumCart();

    return (
        <>
            <div className="cart-widget__content">
                <ul className="cart-widget__product-list">
                    {
                        userProductCart.map(({img, title, price, counter, _id}, i) => {
                            return (
                                <li key={i}>
                                    <Link to={`/product/${_id}`} className="cart-widget__product-item">
                                        <img src={`http://localhost:3001/${img}`} alt={title} className="cart-widget__product-img" />
                                        <div className="cart-widget__product-info">
                                            <div className="cart-widget__product-title">{title}</div>
                                            <div className="cart-widget__product-quantity"><span> {counter} x </span> {price} грн</div>
                                        </div>
                                        <div onClick={() => dispatch(removeProductFromTheCart(_id))} className="cart-widget__product-close"></div>
                                    </Link>
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
                    <Link to='/cart' end onClick={() => {dispatch(hideCartWidget())}} className="btn">Переглянути кошик</Link>
                    <Link to='/checkout' end className="btn"> Оформити замовлення</Link>
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
            <Link to='/catalog' end className="btn">До каталогу</Link>
        </div>
    )
}

export default CartWidget;