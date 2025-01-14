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
import { useTranslation } from 'react-i18next';

const TextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="checkout__form-info-group">
            <label className="checkout__form-info-label">{label}<span style={{'color': '#e01020'}}>*</span></label>
            <input {...props} {...field}/>
            {
                meta.touched && meta.error ? (<div style={{'color': '#e01020'}}>{meta.error}</div>) : null
            }
        </div>
    )
}

const Checkout = () => {
    const { t } = useTranslation()
    const { total, userProductCart } = useSelector(state => state.cartWidget);
    const { fetchEmailLoadingStatus, isSendForm } = useSelector(state => state.checkout);
    const dispatch = useDispatch();
    const [spinnerStyle, setSpinnerStyle] = useState('none')
    const navigate = useNavigate();

    const onFetchEmail = (data) => {
        data.total = total;
        data.userProductCart = userProductCart;
        dispatch(fetchEmail(JSON.stringify(data)));
        dispatch(onSaveOrder(data));
    }

    useEffect(() => {
        dispatch(changeCartIconDisplay(false));
    }, [changeCartIconDisplay]);

    useEffect(() => {
        fetchEmailLoadingStatus === 'loading' ? setSpinnerStyle('block') : setSpinnerStyle('none')
    }, [fetchEmailLoadingStatus]);

    
    useEffect(() => {
        if (isSendForm === true) navigate('/checkout/order-received');
    }, [isSendForm])

    const order = userProductCart.length > 0 ? <Order userProductCart={userProductCart}/> : null;
    return (
        <div className="checkout">
            <div className="container">
                <div className="checkout__spinner" style={{"display": spinnerStyle}}>
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
                                    .min(2, `${t("checkout.min_length")}`)
                                    .required(`${t("checkout.required_field")}`),
                            lastName: Yup.string()
                                    .min(2, `${t("checkout.min_length")}`)
                                    .required(`${t("checkout.required_field")}`),
                            phone: Yup.string()
                                    .matches(/^\+\d{2} \(\d{3}\) \d{3} \d{2} \d{2}$/, `${t("checkout.incorrect_number")}`)
                                    .required(`${t("checkout.required_field")}`),
                            city: Yup.string().when('deliveryMethod', {
                                is: 'nova',
                                then: () => Yup.string().required(`${t("checkout.empty_field")}`),
                                }),
                            warehouse: Yup.string().when('deliveryMethod', {
                                is: 'nova',
                                then: () => Yup.string().required(`${t("checkout.empty_field")}`),
                                }),         
                            ukrDelivery: Yup.string().when('deliveryMethod', {
                                is: 'ukr',
                                then: () => Yup.string().required(`${t("checkout.empty_field")}`),
                                }),
                            checkbox: Yup.string()
                                        .required(`${t("checkout.required_field")}`),
                        })}
                        onSubmit={(value) => onFetchEmail(value)}>
                        {
                            ({values, handleChange, handleBlur}) => (
                                <Form className="checkout__form">
                                    <div className="checkout__form-left">
                                        <div className="checkout__form-info">
                                            <div className="checkout__form-title">{t("checkout.payment_delivery")}</div>
                                            <div className="checkout__form-block">
                                                <TextInput label={`${t("checkout.name")}`} type="text" name='firstName' className="checkout__form-info-input"/>
                                                <TextInput label={`${t("checkout.surname")}`} type="text" name='lastName' className="checkout__form-info-input"/>
                                                <div className="checkout__form-info-group">
                                                    <label className="checkout__form-info-label">{t("checkout.phone")}<span style={{'color': '#e01020'}}>*</span></label>
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
                                            <div className="checkout__form-title">{t("checkout.delivery_address")}</div>
                                            <label className="checkout__form-info-label">{t("checkout.shipping_method")}</label>
                                            <Field 
                                                name="deliveryMethod" 
                                                className="checkout__form-delivery-select"
                                                as='select'>
                                                    <option value="nova">{t("footer.delivery.nova_poshta")}</option>
                                                    <option value="ukr">{t("footer.delivery.ukr_poshta")}</option>
                                            </Field>
                                            <ErrorMessage className='error' name='deliveryMethod' component='div'/>
                                            <Delivery method={values.deliveryMethod}/>
                                        </div>
                                        <div className="checkout__form-title">{t("checkout.addition_inform")}</div>
                                        <div className="checkout__form-info-group">
                                            <label className="checkout__form-info-label">{t("checkout.order_notes")}</label>
                                            <Field 
                                                name='text' 
                                                className="checkout__form-info-textarea"
                                                as='textarea'/>
                                            <ErrorMessage className='error' name='phone' component='div'/>
                                        </div>
                                    </div>
                                    <div className="checkout__form-right">
                                        <div className="checkout__form-title">{t("checkout.your_order")}</div>
                                        <div className="checkout__form-check">
                                            <div className="checkout__form-header">
                                                <div className="checkout__form-header-name">{t("checkout.product")}</div>
                                                <div className="checkout__form-header-price">{t("checkout.subtotal")}</div>
                                            </div>
                                            <div className="checkout__form-body">
                                                {order}
                                            </div>
                                            <div className="checkout__form-footer">
                                                <div className="checkout__form-footer-delivery">
                                                {t("footer.delivery.name")}
                                                    <span>
                                                        {values.deliveryMethod === 'nova' ? 
                                                        t("footer.delivery.nova_poshta")
                                                        : 
                                                        t("footer.delivery.ukr_poshta")}
                                                    </span>
                                                </div>
                                                <div className="checkout__form-footer-total">
                                                    {t("checkout.total")}
                                                    <span>{total.toFixed(2)} {t("currency")}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Checkbox handleChange={handleChange} handleBlur={handleBlur}/>
                                        <button type='submit' className="btn">{t("checkout.button")}</button>
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
    const { t } = useTranslation()
    return (
        <ul className="checkout__form-list">
            {
                userProductCart.map(({title, price, counter}, i) => {
                    return (
                        <li key={i} className="checkout__form-list-item">
                            <div className="checkout__form-list-item-name">{title} <span> x {counter}</span></div>
                            <div className="checkout__form-list-item-price">{(price * counter).toFixed(2)} {t("currency")}</div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

const Delivery = ({method}) => {
    const { t } = useTranslation()
    const [citySearch, setCitySearch] = useState('');
    const [warehousesSearch, setWarehousesSearch] = useState([]);
    const { cities, cityLoadingStatus, warehouses, cityLoadingWarehouses } = useSelector( state => state.checkout);
    const dispatch = useDispatch();
    const citySearchRef = useRef();
    const cityRef = useRef();
    const warehouseRef = useRef();
    const labelWarehouseRef = useRef();
    const warehouseListRef = useRef();
    const { values} = useFormikContext();

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
        labelWarehouseRef.current.style.color = '#000';
    }
    
    const onSaveWarehouse = (warehouse) => {
        values.warehouse = warehouse;
        warehouseRef.current.value = warehouse;
        labelWarehouseRef.current.style.display = 'none';
        warehouseListRef.current.style.display = 'none';
    }
 

    const renderCity = (arr, search, loading) => {
        let items = [];

        if (search.length > 2 && arr.length === 0 && loading !== 'loading' || loading === 'error') {
            return (
                <div className="checkout__form-delivery-select-none">
                    {t("checkout.delivery_impossible")}
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
                    {t("checkout.loading")}
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
        const onhiddenCitySearch = event => {

            if (citySearchRef.current && event.target !== citySearchRef.current && 
                cityRef.current.className !== event.target.className) {
                    
                citySearchRef.current.style.display = "none";
                setCitySearch('');
            }
        };

        window.addEventListener('click', onhiddenCitySearch);

        return () => {
            window.removeEventListener('click', onhiddenCitySearch);
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

        const content = loading === 'loading'? 
                                            <div className="checkout__form-delivery-warehouse-select-loading">
                                                {t("checkout.loading")}
                                            </div> 
                                             : <ul>{items}</ul>

        return (
            <div ref={warehouseListRef} className="checkout__form-delivery-warehouse-select-list">
                {content}
            </div>
        );
    }

    const CityInput = (props) => {
        const [field, meta, header] = useField(props);

        const onShowCitySearch = () => {
            citySearchRef.current.style.display = "block";
            citySearchRef.current.focus();
            header.setTouched(false);
            if (warehouseListRef.current) warehouseListRef.current.style.display = 'none';

        };

        return (
            
            <input {...props} {...field} ref={cityRef} onClick={onShowCitySearch}/>
             
        )
    }

    const WarehouseInput = (props) => {
        const [field, meta, header] = useField(props);

        const onSearchWarehouse = () => {
            if (cities.length > 0 && cityRef.current.value.length > 0) {
                labelWarehouseRef.current.style.display = 'none';
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
                        {...field} 
                        ref={warehouseRef}
                        onChange={() => {
                            dispatch(onChangeWarehouse({input: warehouseRef.current.value, arr: warehousesSearch}));
                        }}
                        onClick={onSearchWarehouse}
                    />
                    <div 
                        onClick={onSearchWarehouse}
                        style={{'display': values.warehouse.length > 0 ? 'none': 'block'}} 
                        className="checkout__form-delivery-select-label"
                        ref={labelWarehouseRef}>
                        {t("checkout.branch")}
                    </div>
                </>
             
        )
    }
    
    const searchCity = citySearch.length > 0 ? renderCity(cities, citySearch, cityLoadingStatus) : null;
    const SearchWarehouse = values.city.length > 0 ? renderWarehouse(warehouses, cityLoadingWarehouses): null;

    return (
        <> 
            {
                method === 'nova' ? 
                <>
                    <CityInput
                        placeholder={`${t("checkout.choose_city")}`} 
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
                        {SearchWarehouse}
                        <ErrorMessage style={{'color': '#e01020', 'position': 'relative', 'bottom': '62px'}} 
                                      className='error' 
                                      name='warehouse' 
                                      component='div'/>
                    </div>
                </>
                : 
                <TextInput label={`${t("checkout.index")}`} type="text" name='ukrDelivery' className="checkout__form-info-input"/>
            }
        </>

    )
}

const Checkbox = () => {
    const { t } = useTranslation()
    const [displayCardText, setDisplayCardText] = useState('none');
    const [displayCashText, setDisplayCashText] = useState('none');

    const Checkbox = (props) => {
        const [field] = useField(props);

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
            <input {...props} {...field} onClick={onSwitchCheckbox} />   
        )
    }

    return (
        <>
            <div className="checkout__form-checkbox">
                <div className="checkout__form-checkbox-group">
                    <label htmlFor="checkbox" className="checkout__form-checkbox-label">
                        <Checkbox 
                            name="checkbox" 
                            type="radio" 
                            className="checkout__form-checkbox-card"
                            value='card'
                            />
                        {t("checkout.payment.first")}
                    </label>
                    <div className="checkout__form-checkbox-info" style={{'display': displayCardText}}>
                        {t("checkout.sms")}
                    </div>
                </div>
                <div className="checkout__form-checkbox-group">
                    <label htmlFor="" className="checkout__form-checkbox-label">
                        <Checkbox 
                            name="checkbox"   
                            type="radio" 
                            className="checkout__form-checkbox-cash"
                            value='cash'
                            />
                        {t("checkout.payment.second")}
                    </label>
                    <div className="checkout__form-checkbox-info" style={{'display': displayCashText}}>
                    {t("checkout.receipt")}
                    </div>
                </div>
                <ErrorMessage style={{'color': '#e01020', 'position': 'relative', 'bottom': '25px'}} 
                        className='error' 
                        name='checkbox' 
                        component='div'/>
            </div>

        </>
    )
}

export default Checkout;