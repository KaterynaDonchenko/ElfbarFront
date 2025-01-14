import { useTranslation } from "react-i18next";
import { useRef } from 'react';

import './advantages.scss'

import animation1 from '../../assets/img/animation1.gif';
import animation2 from '../../assets/img/animation2.gif';
import price from '../../assets/img/price.jpg';
import presence from '../../assets/img/presence.jpg';

const Advantages = () => {
    const { t } = useTranslation();
    const priceImgRef = useRef(null);
    const presenceImgRef = useRef(null);
    const priceContentRef = useRef(null);
    const presenceContentRef = useRef(null);

    const onShowImg = (img, content) => {
        img.current.style.display = 'block'; 
        content.current.style.display = 'none'
    }

    const onHiddenImg = (img, content) => {
        img.current.style.display = 'none'; 
        content.current.style.display = 'grid'
    }

    return (
        <div className="advantages">
            <div className="advantages__block"
                 onMouseEnter={() => onShowImg(priceImgRef, priceContentRef)}
                 onMouseLeave={() => onHiddenImg(priceImgRef, priceContentRef)}
                 onTouchStart={() => onShowImg(priceImgRef, priceContentRef)}
                 onTouchEnd={() => onHiddenImg(priceImgRef, priceContentRef)}>
                <img className="advantages__img" src={animation1} alt='elf bar' ref={el => priceImgRef.current = el} />
                <div className="advantages__content" ref={el => priceContentRef.current = el}>
                    <img src={price} alt="price" />
                    <div className="advantages__content-title">{t("advantages.first.price")}</div>
                    <div className="advantages__content-text">{t("advantages.first.original")}</div>
                </div>
            </div>
            <div className="advantages__block" 
                 onMouseEnter={() => onShowImg(presenceImgRef, presenceContentRef)}
                 onMouseLeave={() => onHiddenImg(presenceImgRef, presenceContentRef)}
                 onTouchStart={() => onShowImg(presenceImgRef, presenceContentRef)}
                 onTouchEnd={() => onHiddenImg(presenceImgRef, presenceContentRef)}>
                <img className="advantages__img" src={animation2} alt='elf bar' ref={el => presenceImgRef.current = el} />
                <div className="advantages__content" ref={el => presenceContentRef.current = el}>
                    <img src={presence} alt="presence" />
                    <div className="advantages__content-title">{t("advantages.second.availability")}</div>
                    <div className="advantages__content-text">{t("advantages.second.updating")}</div>
                </div>
            </div>
        </div>
    )
}

export default Advantages;