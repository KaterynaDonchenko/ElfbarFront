import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { useState, useRef, useEffect } from 'react';

import { fetchEmail, fetchCity, fetchWarehouses } from './CheckoutSlice';
import { onChangeWarehouse } from './CheckoutSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice';
import Spinner from '../spinner/Spinner';

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
                            warehouse: '',
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
                            ({values, handleChange, handleBlur}) => (
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
                                            <Delivery method={values.deliveryMethod} 
                                                      handleChange={handleChange}
                                                      handleBlur={handleBlur} 
                                                      valueCity={values.city}/>
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

const Delivery = ({method, handleChange, valueCity}) => {
    const [citySearch, setCitySearch] = useState('');
    const [warehousesSearch, setWarehousesSearch] = useState([]);
    const { cities, cityLoadingStatus, warehouses, cityLoadingWarehouses } = useSelector( state => state.checkout);
    const dispatch = useDispatch();
    const citySearchRef = useRef();
    const cityRef = useRef();
    const warehouseRef = useRef();
    const lableWarehouseRef = useRef();
    const warehouseListRef = useRef();
    const { values, submitForm } = useFormikContext();

    const onFetchCity = (event) => {
        const city = {
            marker: 'city',
            name: event.target.value
        };

        if(event.target.value.length > 2) dispatch(fetchCity(city));
    }

    const onSaveCity = (city, ref) => {
        values.city = city;
        cityRef.current.value = city;
        dispatch(fetchWarehouses({marker: 'warehouse', cityRef: ref}));
        lableWarehouseRef.current.style.color = '#000';
    }
    
    const onSaveWarehouse = (warehouse) => {
        values.warehouse = warehouse;
        warehouseRef.current.value = warehouse;
        lableWarehouseRef.current.style.display = 'none';
        warehouseListRef.current.style.display = 'none';
    }
 

    const renderCity = (arr, search, loading) => {
        if (arr.length > 0) {
            const items = arr.map(({city, cityRef}, i) => {
                return (
                    <li onClick={() => onSaveCity(city, cityRef)} key={i} className="checkout__form-delivery-select-item">
                        {city}
                    </li>
                )
            })

            return (
                <ul className="checkout__form-delivery-select-list">
                    {items}
                </ul>
            )
        }

        if (search.length > 2 && arr.length === 0 && loading !== 'loading') {
            return (
                <div className="checkout__form-delivery-select-none">
                    Доставка в це місто зараз неможлива. Будь ласка, перевіре назву або виберіть інший найближчий населенний пункт
                </div>
            )
        }
    }

    useEffect(() => {
        const onHiddeCitySerch = event => {
            const cityInput = document.querySelector('.checkout__form-delivery-input');

            if (citySearchRef.current && event.target != citySearchRef.current && event.target != cityInput) {
                citySearchRef.current.style.display = "none";
                setCitySearch('');
            }
        };

        window.addEventListener('click', onHiddeCitySerch);

        return () => {
            window.removeEventListener('click', onHiddeCitySerch);
        };
      }, []); 

    const onShowCitySerch = () => {
        citySearchRef.current.style.display = "block";
        citySearchRef.current.focus();
    };

    useEffect(() => {
        setWarehousesSearch([...warehouses]);
    }, [cityLoadingWarehouses])

    const renderWarehouse = (arr) => {
        const items = arr.map(({warehouses}, i) => {
            return (
                <li className="checkout__form-delivery-warehouse-select-item" 
                    key={i} 
                    value={warehouses}
                    onClick={() => onSaveWarehouse(warehouses)}>{warehouses}</li>
            )
        });

        return (
            <ul ref={warehouseListRef} className="checkout__form-delivery-warehouse-select-list">{items}</ul>
        );

    }

    const onSearchWarehouse = () => {
        if (cities.length > 0 && cityRef.current.value.length > 0) {
            lableWarehouseRef.current.style.display = 'none';
            warehouseRef.current.focus();
            warehouseRef.current.value = '';
            warehouseListRef.current.style.display = 'block';
        }
    }

    const searchCity = citySearch.length > 0 ? renderCity(cities, citySearch, cityLoadingStatus) : null;
    const serchWarehouse = values.city.length > 0 ? renderWarehouse(warehouses): null;
    return (
        <> 
            {
                method === 'nova' ? 
                <>
                    <input
                        placeholder='Оберіть місто' 
                        name="city"  
                        className="checkout__form-delivery-input"
                        onChange={handleChange}  
                        onClick={onShowCitySerch}
                        ref={cityRef}
                        readOnly
                        />
                    <input
                        value={citySearch}
                        ref={citySearchRef}
                        style={{'display': 'none'}}
                        name="citySearch"  
                        className="checkout__form-delivery-city-search"
                        onChange={(event) => {
                            onFetchCity(event);
                            setCitySearch(event.target.value);
                        }}
                    />
                    {searchCity}
                    <ErrorMessage className='error' name='phone' component='div'/>
                    <div>
                        <input 
                            name="division" 
                            className="checkout__form-delivery-select"
                            as='input'
                            ref={warehouseRef}
                            onChange={() => {dispatch(onChangeWarehouse({input: warehouseRef.current.value, arr: warehousesSearch}))}}
                            onClick={onSearchWarehouse}
                            />
                        <div onClick={onSearchWarehouse} 
                             className="checkout__form-delivery-select-lable"
                             ref={lableWarehouseRef}>-Оберіть відділення (поштомат)</div>
                        {serchWarehouse}
                        <ErrorMessage className='error' name='phone' component='div'/>
                    </div>
                </>
                : 
                <TextInput label="Введіть данні (індекс)" type="text" name='ukrDelivery' className="checkout__form-info-input"/>
            }
        </>

    )
}

export default Checkout;