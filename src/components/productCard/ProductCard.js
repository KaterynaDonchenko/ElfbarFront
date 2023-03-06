import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

import { saveUserProductCart } from './ProductCartSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 

import './productCard.scss';

import cart from '../../assets/icons/cart.svg';

const ProductCart = ({title, category, price, img, lable, _id, categoryUrl}) => {
    const dispatch = useDispatch();
    const listRef = useRef([]);

    const divLable = lable ? <div className="card-list__item-lable">{lable}</div> : null;

    return (
        <li className="card-list__item"
            onMouseEnter={() => listRef.current[_id].classList.add('card-list__item-hover_active')}
            onMouseLeave={() => listRef.current[_id].classList.remove('card-list__item-hover_active')}>
            <div className="card-list__item-hover" ref={element => listRef.current[_id] = element}></div>
            {divLable}
            <div className="card-list__item-wrapper">
                <Link to={`/product/${_id}`} >
                    <img className='card-list__item-img' src={`http://localhost:3001/${img}`} alt={title} />
                </Link>
                <div className="card-list__item-content">
                    <Link to={`/product/${_id}`} >
                        <div className="card-list__item-title">{title}</div>
                    </Link>
                    <div className="card-list__item-model"><Link to={`/product-category/${categoryUrl}`} end>{category}</Link></div>
                    <div className="card-list__item-footer">
                        <div className="card-list__item-price">
                            <div className="card-list__item-price-now">{price} грн</div>
                        </div>
                        <div onClick={() => {
                            dispatch(saveUserProductCart({_id, title, price, img}))
                            dispatch(changeCartIconDisplay('block'))}} 
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