import { Splide, SplideSlide } from '@splidejs/react-splide';


import TitleH2 from '../../titleH2/TitleH2';

import './mainSlider.scss';
import slide1 from '../../../assets/img/slide/slide1.jpg';
import slide3 from '../../../assets/img/slide/slide3.jpg';
import { useTranslation } from 'react-i18next';

const MainSlider = () => {
    const { t } = useTranslation()
    return (
        <div className="main-slider">
            <Splide options={{
                type: 'loop',
                speed: 1200, 
                height: '100vh', 
                arrows: false, 
                pagination: false,
                autoplay: true,
                pauseOnHover: true,
                breakpoints: {
                    991: {
                        height: '60vh', 
                     
                    }
                  },
                }}>
                <SplideSlide className='main-slider__item'>
                    <img src={slide1} alt="slide 1" />
                    <div className="container">
                        <TitleH2 classN='main-slider__title main-slider__title_big' title={`${t("title_main-screen.second.header")}`}/>
                        <TitleH2 classN='main-slider__title' title={`${t("title_main-screen.second.sub-header")}`}/>
                    </div>
                </SplideSlide>
                <SplideSlide className='main-slider__item'>
                    <img src={slide3} alt="slide 2" />
                    <div className="main-slider__bottom">
                        <TitleH2 classN='main-slider__subtitle-second' title={`${t("title_main-screen.first")}`}/>
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    )
}

export default MainSlider;