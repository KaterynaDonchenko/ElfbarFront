import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { clearUserProductCart } from '../cartWidget/CartWidgetSlice';
import { onChangeStatusSendForm } from '../checkout/CheckoutSlice';
import './orderReceived.scss';
import { useTranslation } from 'react-i18next';

const OrderReceived = () => {
    const { t } = useTranslation()
    const { userPay, userDeliveryMethod } = useSelector(state => state.checkout);
    const { total, userProductCart } = useSelector(state => state.cartWidget);
    const currentDate = new Date();
    const dispatch = useDispatch();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    useEffect(() => {
        dispatch(onChangeStatusSendForm(false));

        return () => {
            localStorage.removeItem('userProductCart');
            dispatch(clearUserProductCart());
        }
    }, [dispatch])

    const renderProducts = (arr) => {
        return arr.map(({title, price, counter}, i) => {
            return (
                <tr key={i}>
                    <td>
                        <Link to={`/product/${title}`}>{title}</Link> 
                        <strong>× {counter}</strong> 
                    </td>
                    <td>{price.toFixed(2)} {t("currency")}</td>
                </tr>
            )
        })
    }
    
    const pay = userPay === 'card' ? `${t("checkout.payment.first")}` : `${t("checkout.payment.second")}`;
    const delivery = userDeliveryMethod === 'nova' ? 
    `${t("footer.delivery.nova_poshta")}` 
    : 
    `${t("footer.delivery.ukr_poshta")}`;

    const products = renderProducts(userProductCart);
    return (
        <div className="order-received">
            <div className="container">
               <div className="order-received__wrapper">
                    <div className="order-received__notice">
                            {t("received.massage")}
                    </div>
                    <ul className="order-received__overview">
                        <li className="order-received__overview-item">
                            {t("received.order_number")}:
                            <strong>{Math.floor(Math.random() * (20000 - 1 + 1)) + 1}</strong>	
                        </li>
                        <li className="order-received__overview-item">
                            {t("received.date")}:
                            <strong>{day}.{month}.{year}</strong>
                        </li>
                        <li className="order-received__overview-item">
                            {t("received.total")}:
                            <strong>{total.toFixed(2)} {t("currency")}</strong>
                        </li>
                        <li className="order-received__overview-item">
                            {t("received.payment_method")}:
                            <strong>{pay}</strong>
                        </li>
                    </ul>
                    <div className="order-received__details">
                        <h2 className="order-received__details-title">{t("received.order_detail")}</h2>
                        <table className="order-received__details-table">
                            <thead className="order-received__details-table-head">
                                <tr>
                                    <th>{t("cart.product")}</th>
                                    <th>{t("received.overall")}</th>
                                </tr>
                            </thead>
                            <tbody className="order-received__details-table-body">
                                {products}
                            </tbody>
                            <tfoot className="order-received__details-table-foot">
                                <tr>
                                    <th>{t("received.total")}:</th>
                                    <td>{total.toFixed(2)} {t("currency")}</td>
                                </tr>
                                <tr>
                                    <th>{t("footer.delivery.name")}:</th>
                                    <td>{delivery}</td>
                                </tr>
                                <tr>
                                    <th>{t("received.payment_method")}:</th>
                                    <td>{pay}</td>
                                </tr>
                                <tr>
                                    <th>{t("received.total")}:</th>
                                    <td>{total.toFixed(2)} {t("currency")}</td>
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