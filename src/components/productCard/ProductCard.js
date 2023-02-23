import { Link } from 'react-router-dom';
import { saveUserProductCart } from './ProductCartSlice';
import { useDispatch } from 'react-redux';
import { changeCartIconDisplay } from '../header/HeaderSlice'; 

import './productCard.scss';

import cart from '../../assets/icons/cart.svg';

const ProductCart = ({title, category, price, img, lable, id}) => {
    const dispatch = useDispatch();

    const divLable = lable ? <div className="card-list__item-lable">{lable}</div> : null;

    return (
        <li className="card-list__item">
            <div className="card-list__item-hover"></div>
            {divLable}
            <div className="card-list__item-wrapper">
                <Link to={`/catalog/${id}`} >
                    <img className='card-list__item-img' src={`http://localhost:3001/${img}`} alt={title} />
                </Link>
                <div className="card-list__item-content">
                    <Link to={`/catalog/${id}`} >
                        <div className="card-list__item-title">{title}</div>
                    </Link>
                    <div className="card-list__item-model"><a href="#">{category}</a></div>
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