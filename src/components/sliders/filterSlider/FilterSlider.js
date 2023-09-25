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

const FilterSlider = () => {
    const { filterSlider, filterSliderStatus } = useSelector(state => state.filterSlider);
    const dispatch = useDispatch();
    const [style, setStyle] = useState([]);

    useEffect(() => {
        dispatch(fetchFilterSlider());
    }, []);

    useEffect(() => {
        setStyle(filterSlider.map(() => ({'borderColor': ''})))
    }, [filterSlider]);

    const onShowArrows = (left, rigth) => {
        left.classList.add('splide__arrow--prev_show');
        rigth.classList.add('splide__arrow--next_show'); 
    }

    const onHideArrows = (left, rigth) => {
        left.classList.remove('splide__arrow--prev_show');
        rigth.classList.remove('splide__arrow--next_show');
    }
    
    const addArrows = () => {
        const slider = document.querySelector('.filter-slider .splide');
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
                        <div className="slide__item-sircle" 
                            onMouseEnter={() => setStyle(style.map((item, index) => index === i ? {'borderColor': color} : item))}
                            onMouseLeave={() => setStyle(style.map((item, index) => index === i ? {'borderColor': '#E9E6E3'} : item))} 
                            style={style[i]}>
                            <img src={`http://localhost:3001/${img}`} alt={`elfbar ${name}`} />
                        </div>
                        <div style={{'color': color}} className="slide__item-subtitle">{name}</div>
                    </Link>
                </SplideSlide>
            )
        })
    }

    const slides = renderFilterSlides(filterSlider);
    const spiner = filterSliderStatus === 'loading' ? <Spinner/> : null;
    const error = filterSliderStatus === 'error' ? <Error/> : null;
    const slider = !(spiner || error ) ?    <Splide options={{rewind: true, 
                                                              perPage: 8,
                                                              breakpoints: {
                                                                991: {
                                                                    perPage: 5,
                                                                    perMove: 5,
                                                                },
                                                                767: {
                                                                    perPage: 3,
                                                                    perMove: 3
                                                                }
                                                              }, 
                                                              perMove: 8, 
                                                              speed: 1200, 
                                                              pagination: false}}>
                                                {slides}
                                            </Splide> : null;

    return (
        <>
            {spiner}
            {error}
            <div className="filter-slider">
                {slider}
                <div className="filter-slider__img">
                    <img src={hand} title='hand'/>
                </div>
            </div>
        </>
    );
}

export default FilterSlider;
