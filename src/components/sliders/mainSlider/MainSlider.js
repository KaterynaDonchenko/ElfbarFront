import { Splide, SplideSlide } from '@splidejs/react-splide';


import TitleH2 from '../../titleH2/TitleH2';

import './mainSlider.scss';
import slide1 from '../../../assets/img/slide/slide1.jpg';
import slide3 from '../../../assets/img/slide/slide3.jpg';

const MainSlider = () => {
    return (
        <div className="main-slider">
            <Splide options={{
                type: 'loop',
                speed: 1200, 
                height: '100vh', 
                arrows: false, 
                pagination: false,
                autoplay: true,
                pauseOnHover: true
                }}>
                <SplideSlide className='main-slider__item'>
                    <img src={slide1} alt="slide 1" />
                    <div className="container">
                        <TitleH2 classN='main-slider__title main-slider__title_big' title='Нові літні смаки'/>
                        <TitleH2 classN='main-slider__title' title='дистриб`ютор оригінальної продукції'/>
                    </div>
                </SplideSlide>
                <SplideSlide className='main-slider__item'>
                    <img src={slide3} alt="slide 2" />
                    <div className="main-slider__bottom">
                        <TitleH2 classN='main-slider__subtitle-second' title='Насолоджуйся продукцією від передових виробників'/>
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    )
}

export default MainSlider;