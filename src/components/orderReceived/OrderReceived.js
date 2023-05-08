import { useSelector } from 'react-redux';

import './orderReceived.scss';

const OrderReceived = () => {
    const { order } = useSelector(state => state.checkout);
    const { total } = useSelector(state => state.cartWidget);
    const { userProductCart } = useSelector( state => state.productCard);
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    const renderProducts = (arr) => {
        return arr.map(({title, price, counter}, i) => {
            return (
                <tr key={i}>
                    <td>
                        <a href="#">{title}</a> 
                        <strong>× {counter}</strong> 
                    </td>
                    <td>{price} грн</td>
                </tr>
            )
        })
    }
    
    const pay = order.checkbox === 'card' ? 'Оплата на картку' : 'Оплата при отриманні';
    const delivery = order.deliveryMethod === 'nova' ? 'Hова Пошта' : 'Укрпошта';
    const products = renderProducts(userProductCart);
    return (
        <div className="order-received">
            <div className="container">
               <div className="order-received__wrapper">
                    <div className="order-received__notice">
                            Дякуємо за замовлення! В разі потреби наш менеджер зв'яжеться з вами.
                    </div>
                    <ul className="order-received__overview">
                        <li className="order-received__overview-item">
                            Номер замовлення:
                            <strong>28770</strong>	
                        </li>
                        <li className="order-received__overview-item">
                            Дата:
                            <strong>{day}.{month}.{year}</strong>
                        </li>
                        <li className="order-received__overview-item">
                            Всього:
                            <strong>{total} грн</strong>
                        </li>
                        <li className="order-received__overview-item">
                            Спосіб оплати:
                            <strong>{pay}</strong>
                        </li>
                    </ul>
                    <div className="order-received__details">
                        <h2 className="order-received__details-title">Подробиці замовлення</h2>
                        <table className="order-received__details-table">
                            <thead className="order-received__details-table-head">
                                <tr>
                                    <th>Товар</th>
                                    <th>Загалом</th>
                                </tr>
                            </thead>
                            <tbody className="order-received__details-table-body">
                                {products}
                            </tbody>
                            <tfoot className="order-received__details-table-foot">
                                <tr>
                                    <th>Разом:</th>
                                    <td>{total} грн</td>
                                </tr>
                                <tr>
                                    <th>Доставка:</th>
                                    <td>{delivery}</td>
                                </tr>
                                <tr>
                                    <th>Спосіб оплати:</th>
                                    <td>{pay}</td>
                                </tr>
                                <tr>
                                    <th>Всього:</th>
                                    <td>{total} грн</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default OrderReceived;