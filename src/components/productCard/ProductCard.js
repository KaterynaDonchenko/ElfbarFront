import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

import { saveUserProductCart } from './ProductCartSlice';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 

import './productCard.scss';

import cart from '../../assets/icons/cart.svg';

const ProductCart = ({title, category, price, img, lable, id}) => {
    const dispatch = useDispatch();
    const listRef = useRef([]);

    const divLable = lable ? <div className="card-list__item-lable">{lable}</div> : null;

    return (
        <li className="card-list__item"
            onMouseEnter={() => listRef.current[id].classList.add('card-list__item-hover_active')}
            onMouseLeave={() => listRef.current[id].classList.remove('card-list__item-hover_active')}>
            <div className="card-list__item-hover" ref={element => listRef.current[id] = element}></div>
            {divLable}
            <div className="card-list__item-wrapper">
                <Link to={`/product/${id}`} >
                    <img className='card-list__item-img' src={`http://localhost:3001/${img}`} alt={title} />
                </Link>
                <div className="card-list__item-content">
                    <Link to={`/catalog/${id}`} >
                        <div className="card-list__item-title">{title}</div>
                    </Link>
                    <div className="card-list__item-model"><NavLink to='' end>{category}</NavLink></div>
                    <div className="card-list__item-footer">
                        <div className="card-list__item-price">
                            <div className="card-list__item-price-now">{price} грн</div>
                        </div>
                        <div onClick={() => {
                            dispatch(saveUserProductCart({id, title, price, img}))
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