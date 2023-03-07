import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

import { fetchEmail, fetchCity } from './CheckoutSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice';

import './checkout.scss'

const TextInput = ({label, ...props}) => {
    const [feild, meta] = useField(props);
    return (
        <div className="checkout__form-info-group">
            <label className="checkout__form-info-lable">{label}<span style={{'color': '#e01020'}}>*</span></label>
            <input {...props} {...feild}/>
            {
                meta.touched && meta.error ? (<div style={{'color': '#e01020'}}>{meta.error}</div>) : null
            }
        </div>
    )
}

const Checkout = () => {
    const { userProductCart } = useSelector( state => state.productCard);
    const { total } = useSelector(state => state.cartWidget);
    const dispatch = useDispatch();
    dispatch(changeCartIconDisplay('none'));

    // dispatch(fetchCity());

    const onFetchEmail = (data) => {
        data.total = total;
        data.userProductCart = userProductCart;
        console.log(data);

        // dispatch(fetchEmail(JSON.stringify(data)))
    }

    const order = userProductCart.length > 0 ? <Order userProductCart={userProductCart}/> : null;
    return (
        <div className="checkout">
            <div className="container">
                <div className="checkout__wrapper">
                    <Formik
                        initialValues = {{
                            firstName: '',
                            lastName: '',
                            phone: '',
                            deliveryMethod: 'nova',
                            city: '',
                            division: '',
                            ukrDelivery: '',
                            text: '',
                        }}
                        validationSchema = {Yup.object({
                            firstName: Yup.string()
                                    .min(2, 'Мінімум 2 символа')
                                    .required('Обов*язкове поле'),
                            lastName: Yup.string()
                                    .min(2, 'Мінімум 2 символа')
                                    .required('Обов*язкове поле'),
                            phone: Yup.string()
                                    .required('Обов*язкове поле'),
                        })}
                        onSubmit={(value) => onFetchEmail(value)}
                        >
                        {
                            ({isSubmitting, values, handleChange, handleBlur, handleSubmit}) => (
                                <Form className="checkout__form">
                                    <div className="checkout__form-left">
                                        <div className="checkout__form-info">
                                            <div className="checkout__form-title">Оплата та доставка</div>
                                            <div className="checkout__form-block">
                                                <TextInput label="Ім'я" type="text" name='firstName' className="checkout__form-info-input"/>
                                                <TextInput label="Прізвище" type="text" name='lastName' className="checkout__form-info-input"/>
                                                <div className="checkout__form-info-group">
                                                    <label className="checkout__form-info-lable">Телефон<span style={{'color': '#e01020'}}>*</span></label>
                                                    <InputMask 
                                                        type="tel" 
                                                        mask="+38 (999) 999 99 99" 
                                                        name='phone' 
                                                        onChange={handleChange} 
                                                        onBlur={handleBlur} 
                                                        value={values.phone} 
                                                        className="checkout__form-info-input"/>
                                                    <ErrorMessage style={{'color': '#e01020'}} name='phone' component='div'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="checkout__form-delivery">
                                            <div className="checkout__form-title">Вкажіть адресу доставки</div>
                                            <lable className="checkout__form-info-lable">Виберіть спосіб доставки</lable>
                                            <Field 
                                                name="deliveryMethod" 
                                                className="checkout__form-delivery-select"
                                                as='select'>
                                                    <option value="nova">нова пошта</option>
                                                    <option value="ukr">укрпошта</option>
                                            </Field>
                                            <ErrorMessage className='error' name='deliveryMethod' component='div'/>
                                            <Delivery method={values.deliveryMethod}/>
                                        </div>
                                        <div className="checkout__form-title">Додаткова інформація</div>
                                        <div className="checkout__form-info-group">
                                            <lable className="checkout__form-info-lable">Нотатки до замовлень (необов'язково)</lable>
                                            <Field 
                                                name='text' 
                                                className="checkout__form-info-textarea"
                                                as='textarea'/>
                                            <ErrorMessage className='error' name='phone' component='div'/>
                                        </div>
                                    </div>
                                    <div className="checkout__form-right">
                                        <div className="checkout__form-title">Ваше замовлення</div>
                                        <div className="checkout__form-check">
                                            <div className="checkout__form-header">
                                                <div className="checkout__form-header-name">Товар</div>
                                                <div className="checkout__form-header-price">Проміжний підсумок</div>
                                            </div>
                                            <div className="checkout__form-body">
                                                {order}
                                            </div>
                                            <div className="checkout__form-footer">
                                                <div className="checkout__form-footer-delivery">
                                                    Доставка
                                                    <span>Нова Пошта</span>
                                                </div>
                                                <div className="checkout__form-footer-total">
                                                    Загалом
                                                    <span>{total} грн</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="checkout__form-checkbox">
                                            <div className="checkout__form-checkbox-group">
                                                <label htmlFor="" className="checkout__form-checkbox-lable">
                                                    <Field 
                                                        name='check' 
                                                        type="radio" 
                                                        className="checkout__form-checkbox-item" />
                                                    Оплата на картку
                                                </label>
                                                <ErrorMessage className='error' name='check' component='div'/>
                                                {/* <div className="checkout__form-checkbox-info">На вказаний номер телефону буде відправлено СМС з реквізитами на оплату.</div> */}
                                            </div>
                                            <div className="checkout__form-checkbox-group">
                                                <label htmlFor="" className="checkout__form-checkbox-lable">
                                                    <Field 
                                                        name='check'   
                                                        type="radio" 
                                                        className="checkout__form-checkbox-item" />
                                                    Оплата при отриманні
                                                </label>
                                                <ErrorMessage className='error' name='check' component='div'/>
                                                {/* <div className="checkout__form-checkbox-info">Оплата при отриманні товару у відділені Нова Пошта (накладений платіж)</div> */}
                                            </div>
                                        </div>
                                        <button type='submit' className="btn">Підтвердити замовлення</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}

const Order = ({userProductCart}) => {
    return (
        <ul className="checkout__form-list">
            {
                userProductCart.map(({title, price, counter}, i) => {
                    return (
                        <li key={i} className="checkout__form-list-item">
                            <div className="checkout__form-list-item-name">{title} <span> x {counter}</span></div>
                            <div className="checkout__form-list-item-price">{price * counter} грн</div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

const Delivery = ({method}) => {
    return (
        <> 
            {
                method === 'nova' ? 
                <>
                    <Field 
                        placeholder='Оберіть місто' 
                        name="city"  
                        className="checkout__form-delivery-select"
                        as='select'>
                            <option value=""></option>
                    </Field>
                    <ErrorMessage className='error' name='phone' component='div'/>
                    <Field 
                        placeholder='Оберіть відділення' 
                        name="division" 
                        className="checkout__form-delivery-select"
                        as='select'>
                            <option value=""></option>
                    </Field>
                    <ErrorMessage className='error' name='phone' component='div'/>
                </>
                : 
                <TextInput label="Введіть данні" type="text" name='ukrDelivery' className="checkout__form-info-input"/>
            }
        </>

    )
}

export default Checkout;