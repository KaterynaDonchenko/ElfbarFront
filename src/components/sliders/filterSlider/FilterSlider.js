import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilterSlider } from './FilterSliderSlice'; 
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Spiner from '../../spinner/Spinner';
import Error from '../../error/Error';

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

    function showArrows(left, rigth) {
        left.classList.add('splide__arrow--prev_show');
        rigth.classList.add('splide__arrow--next_show'); 
    }

    function hideArrows(left, rigth) {
        left.classList.remove('splide__arrow--prev_show');
        rigth.classList.remove('splide__arrow--next_show');
    }

    useEffect(() => {
        const slider = document.querySelector('.filters .splide');
        const arrowLeft = document.querySelector('.splide__arrow--prev');
        const arrowRight = document.querySelector('.splide__arrow--next');

        slider.addEventListener('mouseover', () => showArrows(arrowLeft, arrowRight));
        slider.addEventListener('mouseout', () => hideArrows(arrowLeft, arrowRight));

        return () => {
            slider.removeEventListener('mouseover', () => showArrows(arrowLeft, arrowRight));
            slider.removeEventListener('mouseout', () => hideArrows(arrowLeft, arrowRight));
        }
    });

    const renderFilterSlides = (arr) => {

        return arr.map( ({name, img, color}, i) => {
            return (
                <SplideSlide key={i} className='slide'>
                    <Link to={`/product-category/${name}`}>
                        <div className="slide__item-sircle" 
                            onMouseEnter={() => setStyle(style.map((item, index) => index === i ? {'borderColor': color} : item))}
                            onMouseLeave={() => setStyle(style.map((item, index) => index === i ? {'borderColor': '#E9E6E3'} : item))} 
                            style={style[i]}>
                            <img src={`http://localhost:3001/${img}`} alt={`elfbar ${name}`} />
                        </div>
                        <div className="slide__item-title">ELFBAR</div>
                        <div style={{'color': color}} className="slide__item-price">{name}</div>
                    </Link>
                </SplideSlide>
            )
        })
    }

    const slides = renderFilterSlides(filterSlider);
    const spiner = filterSliderStatus === 'loading' ? <Spiner/> : null;
    const error = filterSliderStatus === 'error' ? <Error/> : null;
    const slider = slides ? <Splide options={{rewind: true, perPage: 8, perMove: 4, speed: 1200, pagination: false}}>{slides}</Splide> : null;

    return (
        <>
            {spiner}
            {error}
            {slider}
        </>
    );
}

export default FilterSlider;
