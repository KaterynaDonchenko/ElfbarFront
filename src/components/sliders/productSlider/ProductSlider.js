import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


import './productSlider.scss';

import cart from '../../../assets/icons/cart.svg';

const ProductSlider = () => {
    const { products, productsLoadingStatus } = useSelector(state => state.products);

    function showArrows(left, rigth) {
        left.classList.add('splide__arrow--prev_show');
        rigth.classList.add('splide__arrow--next_show'); 
    }

    function hideArrows(left, rigth) {
        left.classList.remove('splide__arrow--prev_show');
        rigth.classList.remove('splide__arrow--next_show');
    }

    const onShowArrows = () => {
        const slider = document.querySelector('.product-slider .splide');
        const arrowLeft = document.querySelector('.splide__arrow--prev');
        const arrowRight = document.querySelector('.splide__arrow--next');

        slider.addEventListener('mouseover', () => showArrows(arrowLeft, arrowRight));
        slider.addEventListener('mouseout', () => hideArrows(arrowLeft, arrowRight));

        return () => {
            slider.removeEventListener('mouseover', () => showArrows(arrowLeft, arrowRight));
            slider.removeEventListener('mouseout', () => hideArrows(arrowLeft, arrowRight));
        }
    }

    useEffect(() => {
        if (products.length > 5) onShowArrows()
        console.log(products.length);
    }, [products]);

    const renderProductCard = (arr) => {
        if (arr.length !== 0) {
            return arr.map(({_id, title, category, price, img}, i) => {
                return (
                    <SplideSlide key={i} className='product-slider'>
                        <div className="product-slider__wrapper">
                            <Link to={`/product/${_id}`}>
                                <img className='product-slider__img' src={`http://localhost:3001/${img}`} alt={title} />
                            </Link>
                            <div className="product-slider__content">
                                <Link to={`/catalog/${_id}`} >
                                    <div className="product-slider__title">{title}</div>
                                </Link>
                                <div className="product-slider__model"><Link to='' end>{category}</Link></div>
                                <div className="product-slider__footer">
                                    <div className="product-slider__price">{price} грн</div>
                                    <div 
                                        className="product-slider__basket">
                                        <img src={cart} alt="cart" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                )
            });
        }
    }

    const cardItem = renderProductCard(products) ;
    return (
        <div className="product-slider">
            <Splide options={{rewind: true, perPage: 5, perMove: 5, speed: 1200, pagination: false}}>
                {cardItem}
            </Splide>
        </div>
    )
}

export default ProductSlider;