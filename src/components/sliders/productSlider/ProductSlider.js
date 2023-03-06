import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { saveUserProductCart } from '../../productCard/ProductCartSlice';
import Spinner from '../../spinner/Spinner';
import Error from '../../error/Error';


import './productSlider.scss';

import cart from '../../../assets/icons/cart.svg';

const ProductSlider = () => {
    const { products, productsLoadingStatus } = useSelector(state => state.products);
    const { productId } = useParams();
    const dispatch = useDispatch();

    function onShowArrows(left, rigth) {
        left.classList.add('splide__arrow--prev_show');
        rigth.classList.add('splide__arrow--next_show'); 
    }

    function onHideArrows(left, rigth) {
        left.classList.remove('splide__arrow--prev_show');
        rigth.classList.remove('splide__arrow--next_show');
    }

    const addArrows = () => {
        const slider = document.querySelector('.product-slider');
        const arrowLeft = slider.querySelector('.splide__arrow--prev');
        const arrowRight = slider.querySelector('.splide__arrow--next');
        const sliderArrows = slider.querySelector('.splide__arrows');
        
        sliderArrows.style.display = 'block';

        slider.addEventListener('mouseover', () => onShowArrows(arrowLeft, arrowRight));
        slider.addEventListener('mouseout', () => onHideArrows(arrowLeft, arrowRight));

        return () => {
            slider.removeEventListener('mouseover', () => onShowArrows(arrowLeft, arrowRight));
            slider.removeEventListener('mouseout', () => onHideArrows(arrowLeft, arrowRight));
        }
    }

    const removeArrows = () => {
        const sliderArrows = document.querySelector('.product-slider .splide__arrows');
        sliderArrows.style.display = 'none';
    }

    useEffect(() => {
        products.length > 5 ? addArrows() : removeArrows();
    }, [products]);

    const renderProductCard = (arr) => {
        if (arr.length !== 0) {
            return arr.map(({_id, title, category, price, img, categoryUrl}, i) => {
                if (_id != productId) {
                    return (
                        <SplideSlide key={i} className='product-slider'>
                            <div className="product-slider__item">
                                <div className="product-slider__wrapper">
                                    <Link to={`/product/${_id}`}>
                                        <img className='product-slider__img' src={`http://localhost:3001/${img}`} alt={title} />
                                    </Link>
                                    <div className="product-slider__content">
                                        <Link to={`/product/${_id}`} >
                                            <div className="product-slider__title">{title}</div>
                                        </Link>
                                        <div className="product-slider__model"><Link to={`/product-category/${categoryUrl}`} end>{category}</Link></div>
                                        <div className="product-slider__footer">
                                            <div className="product-slider__price">{price} грн</div>
                                            <div className="product-slider__basket"
                                                 onClick={() => dispatch(saveUserProductCart({_id, title, price, img}))}>
                                                <img src={cart} alt="cart" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SplideSlide>
                    )
                }
            });
        }
    }

    const cardItem = renderProductCard(products) ;
    const spiner = productsLoadingStatus === 'loading' ? <Spinner/> : null;
    const error = productsLoadingStatus === 'error' ? <Error/> : null;
    const content = products ? <Splide options={{rewind: true, perPage: 5, perMove: 5, speed: 1200, pagination: false}}>
                                    {cardItem}
                                </Splide> : null;
    return (
        <div className="product-slider">
            {spiner}
            {error}
            {content}
        </div>
    )
}

export default ProductSlider;