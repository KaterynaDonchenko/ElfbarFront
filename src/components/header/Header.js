import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useResize } from '../../hooks/resize.hook';
import { setFilter } from "../filters/FilterSlice";
import { setCurrentPage } from '../pagination/PaginationSlice';
import { changeDisplayCartWidget, changeFutureDateOfTheLocaleStorage, clearUserProductCart } from '../cartWidget/CartWidgetSlice';
import { changeMobileMenuDisplay, changeCartIconDisplay} from './HeaderSlice';
import Search from '../search/Search';
import CheckAge from '../modals/checkAge/CheckAge';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './header.scss'

import logo from '../../assets/icons/LogoPar.svg';

const Header = () => {
    const { i18n, t } = useTranslation()
    const { cartIconDisplay, mobileMenuDisplay } = useSelector(state => state.header);
    const { userProductCart } = useSelector(state => state.cartWidget);
    const { filterSlider, filterSliderStatus } = useSelector(state => state.filterSlider);
    const arrowRight = useRef();
    const dispatch = useDispatch();
    const currentDate = new Date(); 
    const futureDate = new Date(currentDate);
    const [rotateArrow, setRotateArrow] = useState(false);
    const [mobileMenuItems, setMobileMenuItems] = useState(false);
    const mobileCatalog = useRef();
    const headerCart = useRef();
    const userWindowWidth = useResize();
    const [languageClass, setLanguageClass] = useState(undefined)

    useEffect(() => {
        const isFutureDateInLocaleStorage = localStorage.getItem('futureDate');

        if (!isFutureDateInLocaleStorage) {
            dispatch(changeFutureDateOfTheLocaleStorage(futureDate.setDate(currentDate.getDate() + 10)))
        }
    }, [dispatch])

    useEffect(() => {
        checkExpiration();
    }, []);

    useEffect(() => {
        if (userWindowWidth >= 991) dispatch(changeMobileMenuDisplay(false));
    }, [userWindowWidth, dispatch])

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language)
        localStorage.setItem('language', language)
    }

    useEffect(() => {
        if (mobileMenuDisplay === true) {
            const bottomPanel = document.querySelector('.browser-controls');
            if (bottomPanel) {
                const btnQuestion = document.querySelector('.header__mobile-menu-down-block')
                bottomPanel.style.display = 'block';
                const height = bottomPanel.getBoundingClientRect().height;
                btnQuestion.style.paddingBottom = `${height}px`;
            }
        }
    }, [mobileMenuDisplay])

    function checkExpiration () {
        const storedDate = localStorage.getItem('futureDate');
        
        if (currentDate.toLocaleString() >= storedDate) {
            localStorage.removeItem('userProductCart');
            localStorage.removeItem('futureDate');
            dispatch(clearUserProductCart());
        }
    }

    setInterval(checkExpiration, 24 * 60 * 60 * 1000);

    const counter = userProductCart.length > 0 ? userProductCart.reduce((sum, item) => sum + item.counter, 0) : 0;

    const goToCatalog = () => {
        dispatch(setFilter('all'));
        dispatch(setCurrentPage(0));
    }

    const renderCategoryMobileList = (arr) => {
        const categoryItem = arr.map( ({name, img, }, i) => {
            return (
                <li key={i} className='header__mobile-menu-category-item'>
                    <Link to={`/product-category/${name}`}>
                        <div className="header__mobile-menu-category-item-circle" >
                            <img src={`http://localhost:3001/${img}`} alt={`elfbar ${name}`} />
                        </div>
                        <div className="header__mobile-menu-category-item-title">{name.slice(0, 23)}</div>
                    </Link>
                </li>
            )
        })

        return (
            <CSSTransition in={mobileMenuItems} 
                               timeout={300} 
                               unmountOnExit 
                               mountOnEnter
                               classNames="mobile-menu-category-list">
                                
                <ul className='header__mobile-menu-category-list' 
                    ref={mobileCatalog}>
                    {filterSliderStatus === 'loading' ? <Spinner/> : filterSliderStatus === 'error' ? <Error/> : categoryItem}
                </ul>
            </CSSTransition>
        )
    }

    const categoryList = filterSlider.length > 0 ? renderCategoryMobileList(filterSlider) : null;

    const onToggleArrowAndMobileMenu = () => {
        setMobileMenuItems(!mobileMenuItems);
        setRotateArrow(!rotateArrow);
    }

    const onToggleDisplayMobileCatalog = () => {
        const mobileMenu = document.querySelector('.header__mobile-menu-list');
        const itemQuestionMobile = document.querySelector('.header__mobile-menu-item-question')
        
        if (document.querySelector('.header__mobile-menu-item-arrow').classList.contains('mobile-menu-item-arrow-enter-done')) {
            mobileMenu.style.gridTemplate= '';
            itemQuestionMobile.style.paddingTop = '';
        } else {
            mobileMenu.style.gridTemplate = `60px 60px ${60*filterSlider.length + 60}px / 1fr`;
            itemQuestionMobile.style.paddingTop = `${60*filterSlider.length + 15}px`;
        }
    }

    const onChangeShowMobileMenu = () => {
        onToggleArrowAndMobileMenu(); 
        onToggleDisplayMobileCatalog();
    }

    const onShowLanguageDropdown = () => {
        typeof languageClass === "undefined" ? setLanguageClass("header__show-language-select") 
                                             : setLanguageClass(undefined)
    }
    
    return (
        <header className="header">
            <CheckAge/>   
            <NavLink className="header__logo" to='/' >
                <img src={logo} alt="logo" />
            </NavLink>
            <nav className="header__menu">
                <ul className="header__menu-list">
                    <li className="header__menu-item">
                        <NavLink to='/' end>{t("header.main")}</NavLink>
                    </li>
                    <li className="header__menu-item">
                        <NavLink to={`/catalog/filter?orderby=all&page=1`} onClick={goToCatalog} end>{t("header.catalog")}</NavLink>
                    </li>
                    <li className="header__menu-item">
                        <NavLink to='/question' end>{t('header.answer')}</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="header__settings">
                <div className="header__settings-left-block">
                    <a href="https://t.me/elfbars_1" className="header__settings-social-telegram">
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"><path d="M21.9453125,2.7646484c-0.4393311-0.3643188-1.0431519-0.4580688-1.5722656-0.2441406L2.4560547,9.7539062c-0.788147,0.3244019-1.1640625,1.2263184-0.8396606,2.0144043c0.1677856,0.4075928,0.50177,0.723938,0.9177856,0.8693848l3.8652344,1.34375l2.0947266,6.9257812c0.0042114,0.0140991,0.0171509,0.0227051,0.022583,0.0362549c0.0216675,0.0552368,0.0533447,0.1060791,0.0933228,0.1499023c0.0148926,0.0176392,0.0311279,0.0341797,0.0484619,0.0494385c0.0521851,0.043335,0.112793,0.0753784,0.1779785,0.0940552c0.0099487,0.0029297,0.0166016,0.0117798,0.0267334,0.0140991l0.0058594-0.0002441l0.0029297,0.0012207c0.0333862,0.0074463,0.0674438,0.0110474,0.1015625,0.0107422c0.0446167-0.0015869,0.0888672-0.0092773,0.1313477-0.0228882c0.0082397-0.0022583,0.0165405-0.0016479,0.0245972-0.0043335c0.0725708-0.0255737,0.1381226-0.067627,0.1915283-0.1229248c0.0062256-0.0062256,0.015686-0.0073242,0.0216675-0.013916l3.0136719-3.3251953l4.3964844,3.4042969C17.0200195,21.3865967,17.3493652,21.500061,17.6884155,21.5c0.7333984-0.0001221,1.3664551-0.513855,1.5175781-1.2314453L22.46875,4.2509766C22.5817871,3.6968994,22.3805542,3.1256104,21.9453125,2.7646484z M9.5878906,15.2949219l-0.7072144,3.4367676l-1.4748535-4.8778076l7.3148804-3.809021l-4.9970703,4.9971313C9.654541,15.111145,9.6073608,15.1990967,9.5878906,15.2949219z M18.2265625,20.0673828c-0.0383301,0.184082-0.1696777,0.335022-0.3466797,0.3984375c-0.1729736,0.0665283-0.3682861,0.0368652-0.5136719-0.078125l-4.7636719-3.6884766c-0.2062378-0.159668-0.5006104-0.133728-0.6757812,0.0595703l-2.0956421,2.3121948l0.7059937-3.4274292l7.1884766-7.1894531c0.1953735-0.1950073,0.1956787-0.5114136,0.0006714-0.7067261c-0.1542358-0.1546021-0.3909912-0.1911011-0.5846558-0.0901489L6.7782593,13.053894l-3.9169312-1.3615112C2.6478271,11.6221313,2.5026245,11.4239502,2.5,11.1992188c-0.0103149-0.2263184,0.1236572-0.4343872,0.3339844-0.5185547l17.9140625-7.2324219c0.1871338-0.0794067,0.4030762-0.0461426,0.5576172,0.0859375c0.1538086,0.1241455,0.2244873,0.3244019,0.1826172,0.5175781L18.2265625,20.0673828z"/></svg>
                    </a>
                    <div className="header__settings-language" onClick={onShowLanguageDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="25" enableBackground="new 0 0 512 512" viewBox="0 0 512 512"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2.613" strokeWidth="12.47" d="
                        M371.455,57.439c110.008,63.446,147.69,204.049,84.162,313.95c-63.479,109.957-204.143,147.622-314.101,84.121
                        C31.509,392.064-6.176,251.467,57.352,141.561C120.831,31.609,261.495-6.058,371.455,57.439z"/>
                        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2.613" strokeWidth="12.47" d="M26.495 255.495c58.173 5.352 126.172 27.446 192.601 65.755 66.428 38.309 119.538 86.139 153.244 133.821M486.474 257.455c-58.173-5.352-126.173-27.402-192.601-65.755-66.376-38.304-119.539-86.133-153.241-133.821"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2.613" strokeWidth="12.47" d="
                        M371.455,57.439c56.893,32.805,51.491,148.502-12.04,258.46c-63.476,109.955-161.053,172.466-217.898,139.611
                        c-56.849-32.799-51.491-148.503,12.036-258.459C217.032,87.152,314.609,24.635,371.455,57.439z"/><line x1="371.455" x2="141.517" y1="57.439" y2="455.511" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2.613" strokeWidth="12.47"/><line x1="455.617" x2="57.352" y1="371.39" y2="141.561" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2.613" strokeWidth="12.47"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="12.47" d="
                        M371.455,57.439c110.008,63.446,147.69,204.049,84.162,313.95c-63.479,109.957-204.143,147.622-314.101,84.121
                        C31.509,392.064-6.176,251.467,57.352,141.561C120.831,31.609,261.495-6.058,371.455,57.439z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="12.47" d="
                        M371.455,57.439c56.893,32.805,51.491,148.502-12.04,258.46c-63.476,109.955-161.053,172.466-217.898,139.611
                        c-56.849-32.799-51.491-148.503,12.036-258.459C217.032,87.152,314.609,24.635,371.455,57.439z"/><line x1="371.455" x2="141.517" y1="57.439" y2="455.511" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2.613" strokeWidth="12.47"/><line x1="455.617" x2="57.352" y1="371.39" y2="141.561" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2.613" strokeWidth="12.47"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2.613" strokeWidth="12.47" d="M26.495 255.495c58.173 5.352 126.172 27.446 192.601 65.755 66.428 38.309 119.538 86.139 153.244 133.821M486.474 257.455c-58.173-5.352-126.173-27.402-192.601-65.755-66.376-38.304-119.539-86.133-153.241-133.821"/></svg>
                        <div className={`header__language-select ${languageClass}`}>
                            <div onClick={() => handleLanguageChange('en')} className="header__language-select-item">En</div>
                            <div onClick={() => handleLanguageChange('ua')} className="header__language-select-item">Uk</div>
                        </div>
                    </div>
                    <Search/>
                </div>
                <div className="header__settings-right-block">
                    <a href="https://t.me/elfsolodkiypar" className="header__settings-manager-telegram">{t("ask")}</a>
                </div>
            </div>
            <div className="header__mobile-menu" onClick={() => {dispatch(changeMobileMenuDisplay(true));
                                                                document.body.style.overflow = 'hidden'; 
                                                                if (headerCart.current) dispatch(changeCartIconDisplay(false))}}>
                    <div className="header__mobile-menu-line"></div>
                    <div className="header__mobile-menu-line"></div>
                    <div className="header__mobile-menu-line"></div>
            </div>
            <CSSTransition in={mobileMenuDisplay} 
                            timeout={400} 
                            classNames="header__mobile-menu-wrapper">
                <div className="header__mobile-menu-wrapper">
                    <CSSTransition in={mobileMenuDisplay} 
                                    timeout={400} 
                                    classNames="header__mobile-menu-block">
                        <div className="header__mobile-menu-block">
                            <div className="header__mobile-menu-header">
                                <NavLink className="header__logo header__mobile-logo" to='/' >
                                    <img src={logo} alt="logo" />
                                </NavLink>
                                <div className="header__mobile-menu-close" 
                                     onClick={() => {dispatch(changeMobileMenuDisplay(false));
                                     document.body.style.overflow = '';
                                     if (counter > 0) dispatch(changeCartIconDisplay(true))}}>{t("cart_widget.close")}</div>
                            </div>
                            <div className="header__mobile-menu-search">
                                <Search activeClass='search__line_active'/>
                            </div>
                            <ul className="header__mobile-menu-list">
                                <li className="header__mobile-menu-item">
                                    <NavLink to='/' end>{t("header.main")}</NavLink>
                                </li>
                                <li className="header__mobile-menu-item">
                                    <div className="header__mobile-menu-item-link">
                                        <NavLink to={`/catalog/filter?orderby=all&page=1`} 
                                                 onClick={goToCatalog}>
                                            {t("header.catalog")}
                                        </NavLink>
                                        <div className="header__mobile-menu-item-wrapper"
                                             ref={arrowRight}  
                                             onClick={onChangeShowMobileMenu}>
                                            <CSSTransition in={rotateArrow} 
                                                           timeout={300} 
                                                classNames="mobile-menu-item-arrow">
                                                <div className="header__mobile-menu-item-arrow"></div>
                                            </CSSTransition>
                                        </div>
                                    </div>
                                    {categoryList}
                                </li>
                                <li className="header__mobile-menu-item header__mobile-menu-item-question">
                                    <NavLink to='/question' end>{t("header.answer")}</NavLink>
                                    <div className="header__mobile-langue-select">
                                        <div onClick={() => handleLanguageChange('en')} 
                                             className="header__language-select-item">Eng</div>
                                        <div onClick={() => handleLanguageChange('ua')}
                                             className="header__language-select-item">Uk</div>
                                    </div>
                                    <div className="header__mobile-menu-down-block">
                                        <div className="header__mobile-menu-btn">
                                            <a href="https://t.me/elfsolodkiypar" className="header__mobile-menu-telegram">
                                                {t("header.answer")}
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
            <CSSTransition in={cartIconDisplay} 
                            timeout={300} 
                            unmountOnExit 
                            mountOnEnter
                            classNames="cart-icon">
                <div  className='header__cart' ref={headerCart}
                    onClick={() => {dispatch(changeDisplayCartWidget(true)); document.body.style.overflow = 'hidden'}}>
                    <div className="header__cart-wrapper">
                    <svg role="img" className="header__cart-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                        <path fill="none" strokeWidth="2" strokeMiterlimit="10" d="M44 18h10v45H10V18h10z"/><path fill="none" strokeWidth="2" strokeMiterlimit="10" d="M22 24V11c0-5.523 4.477-10 10-10s10 4.477 10 10v13"/></svg>
                    </div>
                    <div className="header__cart-counter">{counter}</div>
                </div> 
            </CSSTransition>  
        </header>
    )
}

export default Header;