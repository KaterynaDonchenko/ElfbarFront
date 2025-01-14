import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilterSlider } from './FilterSliderSlice'; 
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { setCurrentPage } from '../../pagination/PaginationSlice';
import Spinner from '../../spinner/Spinner';
import Error from '../../error/Error';
import hand from '../../../assets/icons/hand.png';

import './filterSlider.scss';
import { useTranslation } from 'react-i18next';

const FilterSlider = () => {
    const { i18n } = useTranslation()
    const { filterSlider, filterSliderStatus } = useSelector(state => state.filterSlider);
    const dispatch = useDispatch();
    const [style, setStyle] = useState([]);

    useEffect(() => {
        dispatch(fetchFilterSlider(i18n.language));
    }, [i18n.language, dispatch]);

    useEffect(() => {
        setStyle(filterSlider.map(() => ({'borderColor': ''})))
    }, [filterSlider, dispatch]);

    useEffect(() => {
            const filterItems = document.querySelector(".filter-slider .splide__list")

            if (!filterItems) return;

            if (window.innerWidth <= 767) {
                if (filterSlider.length < 3) {
                    filterItems.classList.add('splide__list_jc')
                }
            } else if (window.innerWidth <= 991) {
                if (filterSlider.length < 5) {
                    filterItems.classList.add('splide__list_jc')
                }
            } else {
                if (filterSlider.length < 8) {
                    filterItems.classList.add('splide__list_jc')
                }
            }

            return () => {
                filterItems.classList.remove('splide__list_jc');
            };
        
    }, [filterSlider])

    const onShowArrows = (left, right) => {
        left.classList.add('splide__arrow--prev_show');
        right.classList.add('splide__arrow--next_show'); 
    }

    const onHiddenArrows = (left, right) => {
        left.classList.remove('splide__arrow--prev_show');
        right.classList.remove('splide__arrow--next_show');
    }
    
    const addArrows = () => {
        const slider = document.querySelector('.filter-slider .splide');
        const arrowLeft = slider.querySelector('.splide__arrow--prev');
        const arrowRight = slider.querySelector('.splide__arrow--next');
        const sliderArrows = slider.querySelector('.splide__arrows');
        
        sliderArrows.style.display = 'block';

        slider.addEventListener('mouseover', () => onShowArrows(arrowLeft, arrowRight));
        slider.addEventListener('mouseout', () => onHiddenArrows(arrowLeft, arrowRight));

        return () => {
            slider.removeEventListener('mouseover', () => onShowArrows(arrowLeft, arrowRight));
            slider.removeEventListener('mouseout', () => onHiddenArrows(arrowLeft, arrowRight));
        }
    }

    const removeArrows = () => {
        const sliderArrows = document.querySelector('.filter-slider .splide__arrows');
        sliderArrows.style.display = 'none';
    }

    useEffect(() => {
        filterSlider.length > 8 ? addArrows() : removeArrows();
    }, [filterSlider]);

    const renderFilterSlides = (arr) => {
        return arr.map( ({name, img, color}, i) => {
            return (
                <SplideSlide key={i} className='slide'>
                    <Link onClick={() => dispatch(setCurrentPage(0))} to={`/product-category/${name}`}>
                        <div className="slide__item-circle" 
                            onMouseEnter={() => setStyle(style.map((item, index) => index === i ? {'borderColor': color} : item))}
                            onMouseLeave={() => setStyle(style.map((item, index) => index === i ? {'borderColor': '#E9E6E3'} : item))}
                            onTouchStart={() => setStyle(style.map((item, index) => index === i ? {'borderColor': color} : item))}
                            onTouchEnd={() => setStyle(style.map((item, index) => index === i ? {'borderColor': '#E9E6E3'} : item))} 
                            style={style[i]}>
                            <img src={`http://localhost:3001/${img}`} alt={`elfbar ${name}`} />
                        </div>
                        <div style={{'color': color}} className="slide__item-subtitle">{name.slice(0, 17)}</div>
                    </Link>
                </SplideSlide>
            )
        })
    }

    const slides = renderFilterSlides(filterSlider);
    const spinner = filterSliderStatus === 'loading' ? <Spinner/> : null;
    const error = filterSliderStatus === 'error' ? <Error/> : null;
    const slider = !(spinner || error ) ?    <Splide options={{perPage: 8,
                                                              breakpoints: {
                                                                991: {
                                                                    perPage: 5,
                                                                    perMove: 5,
                                                                },
                                                                767: {
                                                                    perPage: 3,
                                                                    perMove: 3
                                                                },
                                                                320: {
                                                                    perPage: 2,
                                                                    perMove: 2
                                                                }
                                                              },  
                                                              speed: 1200,
                                                              pagination: false, 
                                                              rewind: true}}>
                                                {slides}
                                            </Splide> : null;

    return (
        <>
            {spinner}
            {error}
            <div className="filter-slider">
                {slider}
                <div className="filter-slider__img">
                    <img src={hand} title='hand' alt='hand'/>
                </div>
            </div>
        </>
    );
}

export default FilterSlider;
