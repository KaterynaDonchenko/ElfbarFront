import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchEmail, fetchCity, fetchWarehouses } from './CheckoutSlice';
import { onChangeWarehouse, onSaveOrder } from './CheckoutSlice';
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
    const { fetchEmailLoadingStatus, isSendForm } = useSelector(state => state.checkout);
    const dispatch = useDispatch();
    const spinnerRef = useRef();
    const navigate = useNavigate();

    const onFetchEmail = (data) => {
        data.total = total;
        data.userProductCart = userProductCart;
        console.log(data);
        dispatch(fetchEmail(JSON.stringify(data)));
        dispatch(onSaveOrder(data));
    }

    useEffect(() => {
        dispatch(changeCartIconDisplay('none'));
    }, [changeCartIconDisplay]);

    useEffect(() => {
        fetchEmailLoadingStatus === 'loading' ? spinnerRef.current.style.display = 'block' : spinnerRef.current.style.display = 'none';
    }, [fetchEmailLoadingStatus]);

    
    useEffect(() => {
        if (isSendForm === true) setTimeout(() => {navigate('/checkout/order-received')}, 4000);
    }, [isSendForm])

    const order = userProductCart.length > 0 ? <Order userProductCart={userProductCart}/> : null;
    return (
        <div className="checkout">
            <div className="container">
                <div className="checkout__spinner" ref={spinnerRef}>
                    <Spinner/>
                </div>
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
                            checkbox: '',
                        }}
                        validationSchema = {Yup.object({
                            firstName: Yup.string()
                                    .min(2, 'Мінімум 2 символа')
                                    .required('Обов*язкове поле'),
                            lastName: Yup.string()
                                    .min(2, 'Мінімум 2 символа')
                                    .required('Обов*язкове поле'),
                            phone: Yup.string()
                                    .matches(/^\+\d{2} \(\d{3}\) \d{3} \d{2} \d{2}$/, "Невірно введений номер")
                                    .required('Обов*язкове поле'),
                            city: Yup.string().when('deliveryMethod', {
                                is: 'nova',
                                then: () => Yup.string().required('Поле не заповнено'),
                                }),
                            warehouse: Yup.string().when('deliveryMethod', {
                                is: 'nova',
                                then: () => Yup.string().required('Поле не заповнено'),
                                }),         
                            ukrDelivery: Yup.string().when('deliveryMethod', {
                                is: 'ukr',
                                then: () => Yup.string().required('Поле не заповнено'),
                                }),
                            checkbox: Yup.string()
                                        .required('Обов*язкове поле'),
                        })}
                        onSubmit={(value) => onFetchEmail(value)}>
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
                                            <label className="checkout__form-info-lable">Виберіть спосіб доставки</label>
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
                                            <label className="checkout__form-info-lable">Нотатки до замовлень (необов'язково)</label>
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
                                                    <span>{values.deliveryMethod === 'nova' ? 'нова пошта': 'укрпошта'}</span>
                                                </div>
                                                <div className="checkout__form-footer-total">
                                                    Загалом
                                                    <span>{total} грн</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Checkbox deliveryMethod={values.deliveryMethod} handleChange={handleChange} handleBlur={handleBlur}/>
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
        let items = [];

        if (search.length > 2 && arr.length === 0 && loading !== 'loading' || loading === 'error') {
            return (
                <div className="checkout__form-delivery-select-none">
                    Доставка в це місто зараз неможлива. Будь ласка, перевіре назву або виберіть інший найближчий населенний пункт
                </div>
            )
        }

        if (arr.length > 0) {
            items = arr.map(({city, cityRef}, i) => {
                return (
                    <li onClick={() => onSaveCity(city, cityRef)} key={i} className="checkout__form-delivery-select-item">
                        {city}
                    </li>
                )
            })
        }
        
        if (loading === 'loading') {
            return (
                <div className="checkout__form-delivery-select-loading">
                    Завантаження...
                </div>
            )
        } else {
            return (
                <ul className="checkout__form-delivery-select-list">
                    {items}
                </ul>
            )
        }


    }

    useEffect(() => {
        const onHiddeCitySerch = event => {

            if (citySearchRef.current && event.target !== citySearchRef.current && cityRef.current.className !== event.target.className) {
                citySearchRef.current.style.display = "none";
                setCitySearch('');
            }
        };

        window.addEventListener('click', onHiddeCitySerch);

        return () => {
            window.removeEventListener('click', onHiddeCitySerch);
        };
    }, []); 

    useEffect(() => {
        setWarehousesSearch([...warehouses]);
    }, [cityLoadingWarehouses])

    const renderWarehouse = (arr, loading) => {
        const items = arr.map(({warehouses}, i) => {
            return (
                <li className="checkout__form-delivery-warehouse-select-item" 
                    key={i} 
                    value={warehouses}
                    onClick={() => onSaveWarehouse(warehouses)}>{warehouses}</li>
            )
        });

        const content = loading === 'loading'? <div className="checkout__form-delivery-warehouse-select-loading">Завантаження...</div> 
                                             : <ul>{items}</ul>

        return (
            <div ref={warehouseListRef} className="checkout__form-delivery-warehouse-select-list">
                {content}
            </div>
        );
    }

    const CityInput = (props) => {
        const [feild, meta, header] = useField(props);

        const onShowCitySerch = () => {
            citySearchRef.current.style.display = "block";
            citySearchRef.current.focus();
            header.setTouched(false);
            if (warehouseListRef.current) warehouseListRef.current.style.display = 'none';

        };

        return (
            
            <input {...props} {...feild} ref={cityRef} onClick={onShowCitySerch}/>
             
        )
    }

    const WarehouseInput = (props) => {
        const [feild, meta, header] = useField(props);

        const onSearchWarehouse = () => {
            if (cities.length > 0 && cityRef.current.value.length > 0) {
                lableWarehouseRef.current.style.display = 'none';
                warehouseRef.current.focus();
                warehouseRef.current.value = '';
                warehouseListRef.current.style.display = 'block';
                header.setTouched(false);
            }
        }

        return (
                <>
                    <input
                        {...props} 
                        {...feild} 
                        ref={warehouseRef}
                        onChange={() => {
                            dispatch(onChangeWarehouse({input: warehouseRef.current.value, arr: warehousesSearch}));
                        }}
                        onClick={onSearchWarehouse}
                    />
                    <div 
                        onClick={onSearchWarehouse}
                        style={{'display': values.warehouse.length > 0 ? 'none': 'block'}} 
                        className="checkout__form-delivery-select-lable"
                        ref={lableWarehouseRef}>
                        -Оберіть відділення (поштомат)
                    </div>
                </>
             
        )
    }
    
    const searchCity = citySearch.length > 0 ? renderCity(cities, citySearch, cityLoadingStatus) : null;
    const serchWarehouse = values.city.length > 0 ? renderWarehouse(warehouses, cityLoadingWarehouses): null;

    return (
        <> 
            {
                method === 'nova' ? 
                <>
                    <CityInput
                        placeholder='Оберіть місто' 
                        name="city"  
                        className="checkout__form-delivery-input" 
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
                    <ErrorMessage style={{'color': '#e01020', 'position': 'relative', 'bottom': '21px'}} 
                                  className='error' 
                                  name='city' 
                                  component='div'/>
                    <div>
                        <WarehouseInput name="warehouse" className="checkout__form-delivery-select"/>
                        {serchWarehouse}
                        <ErrorMessage style={{'color': '#e01020', 'position': 'relative', 'bottom': '62px'}} 
                                      className='error' 
                                      name='warehouse' 
                                      component='div'/>
                    </div>
                </>
                : 
                <TextInput label="Введіть данні (індекс)" type="text" name='ukrDelivery' className="checkout__form-info-input"/>
            }
        </>

    )
}

const Checkbox = ({deliveryMethod}) => {
    const [displayCardText, setDisplayCardText] = useState('none');
    const [displayCashText, setDisplayCashText] = useState('none');

    const Checkbox = (props) => {
        const [feild, meta] = useField(props);

        const onSwitchCheckbox = () => {
            if (props.className === 'checkout__form-checkbox-card') {
                setDisplayCardText('block');
                setDisplayCashText('none');
    
            } else if (props.className === 'checkout__form-checkbox-cash') {
                setDisplayCardText('none');
                setDisplayCashText('block');
            }
        }

        return (
            <input {...props} {...feild} onClick={onSwitchCheckbox} />   
        )
    }

    return (
        <>
            {deliveryMethod === 'nova' ? 
                <div className="checkout__form-checkbox">
                    <div className="checkout__form-checkbox-group">
                        <label htmlFor="checkbox" className="checkout__form-checkbox-lable">
                            <Checkbox 
                                name="checkbox" 
                                type="radio" 
                                className="checkout__form-checkbox-card"
                                value='card'
                                />
                            Оплата на картку
                        </label>
                        <div className="checkout__form-checkbox-info" style={{'display': displayCardText}}>
                            На вказаний номер телефону буде відправлено СМС з реквізитами на оплату.
                        </div>
                    </div>
                    <div className="checkout__form-checkbox-group">
                        <label htmlFor="" className="checkout__form-checkbox-lable">
                            <Checkbox 
                                name="checkbox"   
                                type="radio" 
                                className="checkout__form-checkbox-cash"
                                value='cash'
                                />
                            Оплата при отриманні
                        </label>
                        <div className="checkout__form-checkbox-info" style={{'display': displayCashText}}>
                            Оплата при отриманні товару у відділені 
                        </div>
                    </div>
                    <ErrorMessage style={{'color': '#e01020', 'position': 'relative', 'bottom': '25px'}} 
                          className='error' 
                          name='checkbox' 
                          component='div'/>
                </div>
            : 
                <div className="checkout__form-checkbox">
                    <div className="checkout__form-checkbox-group">
                        <label htmlFor="checkbox" className="checkout__form-checkbox-lable">
                            <Checkbox 
                                name="checkbox" 
                                type="radio" 
                                className="checkout__form-checkbox-card"
                                value='card'
                                />
                            Оплата на картку
                        </label>
                        <div className="checkout__form-checkbox-info" style={{'display': displayCardText}}>
                            На вказаний номер телефону буде відправлено СМС з реквізитами на оплату.
                        </div>
                    </div>
                    <ErrorMessage style={{'color': '#e01020', 'position': 'relative', 'bottom': '25px'}} 
                            className='error' 
                            name='checkbox' 
                            component='div'/>
                </div>
            }
            
        </>
    )
}

export default Checkout;