import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from './ProductSlice';
import { saveUserProductCart } from '../productCard/ProductCartSlice';

import ProductCounter from '../productCounter/ProductCounter';
import Spiner from '../spinner/Spinner';
import Error from '../error/Error';
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import BreadCrumbsMenu from '../breadeCrumbsMenu/BreadCrumbsMenu';

import './product.scss';

import icon1 from '../../assets/icons/infoEl/strong.svg';
import icon2 from '../../assets/icons/infoEl/man.svg';
import icon3 from '../../assets/icons/infoEl/volume.svg';
import icon4 from '../../assets/icons/infoEl/batterysvg.svg'; 

const Product = () => {
    const { productLoadingStatus } = useSelector(state => state.product);

    const spiner = productLoadingStatus === 'loading' ? <Spiner/> : null;
    const error = productLoadingStatus === 'error' ? <Error/> : null;
    return (
        <section className="product">
            <div className="container">
                {spiner}
                {error}
                <ProductContent/>
            </div>
        </section>
    )
}

const ProductContent = () => {
    const { catalogId } = useParams();
    const { product } = useSelector(state => state.product);
    const { counter } = useSelector(state => state.productCounter)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProduct(catalogId));
    }, [catalogId])

    const {title, price, taste, quantity, category, img, dscr} = product;
    return (
        <div className="product__wrapper">
            <div className="product__img">
            <img src={`http://localhost:3001/${img}`} alt={title} />
            </div>
            <div className="product__right-block">
                <div className="product__breadecrums">
                    <BreadCrumbs/>
                    <BreadCrumbsMenu/>
                </div>
                <h1 className="product__name">{title}</h1>
                <div className="product__price">{price} грн</div>
                <div className="product__dscr">{dscr}</div>
                <select name="" id="" className="product__taste">
                    <option value="">{taste}</option>
                    <option value="">Pineapple Peach mango</option>
                </select>
                <div className="product__amount">{quantity}</div>
                <form action="" className="product__form">
                    <ProductCounter/>
                    <button onClick={(e) => {e.preventDefault(); dispatch(saveUserProductCart({id : catalogId, title, price, img, counter}))}} className="product__form-button">Додати в кошик</button>
                </form>
                <div className="product__category"><span>Категорія:</span> <a href="">{category}</a></div>
                <div className="product__info">
                    <div className="product__info-item">
                        <img src={icon1} alt="" className="product__info-item-img" />
                        <div className="product__info-item-rightblock">
                            <div className="product__info-item-title">Міцність</div>
                            <div className="product__info-item-subtitle">5% (50 mg/ml)</div>
                        </div>
                    </div>
                    <div className="product__info-item">
                        <img src={icon2} alt="" className="product__info-item-img" />
                        <div className="product__info-item-rightblock">
                            <div className="product__info-item-title">Тяг</div>
                            <div className="product__info-item-subtitle">1500</div>
                        </div>
                    </div>
                    <div className="product__info-item">
                        <img src={icon3} alt="" className="product__info-item-img" />
                        <div className="product__info-item-rightblock">
                            <div className="product__info-item-title">Рідина</div>
                            <div className="product__info-item-subtitle">4.8 ml</div>
                        </div>
                    </div>
                    <div className="product__info-item">
                        <img src={icon4} alt="" className="product__info-item-img" />
                        <div className="product__info-item-rightblock">
                            <div className="product__info-item-title">Батарея</div>
                            <div className="product__info-item-subtitle">850 ma/h</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;

