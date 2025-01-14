import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

import { saveUserProductCart } from '../cartWidget/CartWidgetSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 

import './productCard.scss';

import cart from '../../assets/icons/cart.svg';
import { useTranslation } from 'react-i18next';

const ProductCart = ({title, category, price, img, _id, categoryUrl, label}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const listRef = useRef([]);

    const divLabel = label ? <div className="card-list__item-label">{label}</div> : null;

    return (
        <li className="card-list__item"
            onMouseEnter={() => listRef.current[_id].classList.add('card-list__item-hover_active')}
            onMouseLeave={() => listRef.current[_id].classList.remove('card-list__item-hover_active')}
            onTouchStart={() => listRef.current[_id].classList.add('card-list__item-hover_active')}
            onTouchEnd={() => listRef.current[_id].classList.remove('card-list__item-hover_active')}>
            <div className="card-list__item-hover" ref={element => listRef.current[_id] = element}></div>
            {divLabel}
            <div className="card-list__item-wrapper">
                <Link to={`/product/${_id}`} >
                    <img className='card-list__item-img' src={`http://localhost:3001/${img}`} alt={title} />
                </Link>
                <div className="card-list__item-content">
                    <Link to={`/product/${_id}`} >
                        <div className="card-list__item-title">{title.slice(0, 50)}</div>
                    </Link>
                    <div className="card-list__item-model"><Link to={`/product-category/${categoryUrl}`}>{category.slice(0, 15)}</Link></div>
                    <div className="card-list__item-footer">
                        <div className="card-list__item-price">
                            <div className="card-list__item-price-now">{price.toFixed(2)} {t("currency")}</div>
                        </div>
                        <div onClick={() => {
                            dispatch(saveUserProductCart({_id, title, price, img}))
                            dispatch(changeCartIconDisplay(true))}} 
                            className="card-list__item-basket">
                            <img src={cart} alt="cart" />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ProductCart;