import Counter from '../counter/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeProductFromTheCart } from '../productCard/ProductCartSlice';

import './cart.scss';
import emptyCart from '../../assets/icons/empty-cart.svg';

const Cart = () => {
    const { userProductCart } = useSelector( state => state.productCard);

    const content = userProductCart.length > 0 ? <CartWithProducts/> : <EmptyCart/>
    return (
        <div className="cart">
            <div className="container">
                {content}
            </div>
        </div>
    )
}

const Product = ({userProductCart}) => {
    const dispatch = useDispatch();
    return (
        <>
            {
                userProductCart.map(({img, title, price, counter, id}, i) => {
                    return (
                        <tr key={i} className="cart__table-body-row">
                            <td onClick={() => dispatch(removeProductFromTheCart(id))} className="cart__table-body-romove"></td>
                            <td className="cart__table-body-thumbnail">
                                <img src={`http://localhost:3001/${img}`} alt={title} />
                            </td>
                            <td className="cart__table-body-name">{title}</td>
                            <td className="cart__table-body-price">{price} грн</td>
                            <td className="cart__table-body-quantity">
                                <Counter counter={counter} id={id}/>
                            </td>
                            <td className="cart__table-body-subtota">{price * counter} грн</td>
                        </tr>
                    )
                })
            }
        </>
    )
}

const EmptyCart = () => {
    return (
        <div className="cart__empty">
            <img src={emptyCart} alt="empty cart" />
            <h2 className="cart__empty-title">Ваш кошик порожній</h2>
            <div className="cart__empty-title-btn">
                <NavLink to='/catalog' end className="btn">Повернутися в магазин</NavLink>
            </div>
        </div>
    )
}

const CartWithProducts = () => {
    const { userProductCart } = useSelector( state => state.productCard);
    const { total } = useSelector(state => state.cartWidget);

    const product = userProductCart.length > 0 ? <Product userProductCart={userProductCart}/> : null;  

    return (
        <div className="cart__wrapper">
            <form action="" className="cart__form">
                <table className="cart__table">
                    <thead className="cart__table-header">
                        <tr className="cart__table-header-row">
                            <th className="cart__table-header-romove"></th>
                            <th className="cart__table-header-thumbnail"></th>
                            <th className="cart__table-header-name">Товар</th>
                            <th className="cart__table-header-price">Ціна</th>
                            <th className="cart__table-header-quantity">Кількість</th>
                            <th className="cart__table-header-subtota">Проміжний <br/> підсумок</th>
                        </tr>
                    </thead>
                    <tbody className="cart__table-body">
                        {product}
                    </tbody>
                </table>
            </form>
            <div className="cart__total">
                <div className="cart__total-wrapper">
                    <h2 className="cart__total-title">Підсумки кошика</h2>
                    <div className="cart__total-dilivery">
                        Доставка
                        <span>не враховується</span>
                    </div>
                    <div className="cart__total-price">
                        Загалом
                        <span>{total} грн</span>
                    </div>
                    <NavLink to='/checkout' end className="btn"> Перейти до оформлення</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Cart