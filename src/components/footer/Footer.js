import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setFilter } from "../filters/FilterSlice";
import { setCurrentPage } from '../pagination/PaginationSlice';

import tiktok from '../../assets/icons/tiktok-logo-4500.svg'

import './footer.scss';

import logo from '../../assets/icons/LogoPar.svg';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch();

    const goToCatalog = () => {
        dispatch(setFilter('all'));
        dispatch(setCurrentPage(0));
    }

    return (
        <footer className="footer">
            <div className="footer__main">
                <div className="footer__left-block">
                    <img src={logo} alt="logo" className="logo__img" />
                </div>
                <div className="footer__center-block">
                    <nav className="footer__menu">
                        <div className="footer__menu-title">{t("footer.site.name")}</div>
                        <ul className="footer__menu-list">
                            <li className="footer__menu-item">
                                <NavLink to='/'>{t("footer.site.main")}</NavLink>
                            </li>
                            <li className="footer__menu-item">
                                <NavLink to={`/catalog/filter?orderby=all&page=1`} onClick={goToCatalog}>
                                    {t("footer.site.catalog")}
                                </NavLink>
                            </li>
                            <li className="footer__menu-item">
                                <NavLink to='/question'>{t("footer.site.answer")}</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="footer__delivery">
                        <div className="footer__delivery-title">{t("footer.delivery.name")}</div>
                        <ul className="footer__delivery-list">
                            <li className="footer__delivery-item">
                                {t("footer.delivery.nova_poshta")}
                            </li>
                            <li className="footer__delivery-item">
                                {t("footer.delivery.ukr_poshta")}
                            </li>
                        </ul>
                    </div>
                    <div className="footer__pay">
                        <div className="footer__pay-title">{t("footer.payment.name")}</div>
                        <ul className="footer__pay-list">
                            <li className="footer__pay-item">
                                {t("footer.payment.cart")}
                            </li>
                            <li className="footer__pay-item">
                                {t("footer.payment.cash")}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer__right-block">
                    <div className="footer__social">
                        <div className="footer__social-title">{t("footer.follow")}</div>
                        <div className="footer__social-wrapper">
                            <div className="footer__social-telegram">
                                <a href="https://t.me/solodkiypar">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 0C8.95432 4.10142e-05 4.10142e-05 8.95432 0 20C4.2143e-05 31.0457 8.95432 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95432 31.0457 4.2143e-05 20 0ZM30.3601 8.98288C31.1726 8.95326 31.7878 9.68878 31.4581 11.0105L27.4954 29.6862C27.2188 31.0134 26.4163 31.3309 25.3054 30.718L19.268 26.2571C17.85 27.6358 16.5797 28.8706 16.3658 29.0799C16.0295 29.4085 15.7616 29.684 15.1576 29.684C14.3751 29.684 14.5082 29.3878 14.2383 28.6426L12.0173 21.8343L6.21298 20.022C4.92354 19.627 4.91416 18.7412 6.50254 18.1039L29.7751 9.12766C29.9744 9.0372 30.1726 8.98971 30.3601 8.98288ZM26.6686 12.9551C26.4936 12.9527 26.2558 13.0153 26.0109 13.1638L12.9286 21.4177L15.1327 28.1767L15.5692 23.5247L26.7715 13.4174C27.0788 13.1446 26.9603 12.9591 26.6686 12.9551V12.9551Z" fill="black"/>
                                    </svg>
                                </a>
                            </div>
                            <div className="footer__social-instagram">
                                <a href="https://instagram.com/solod.kiypar?igshid=MzRlODBiNWFlZA==">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z" fill="black"/>
                                    <path d="M14.5469 7C10.3906 7 7 10.3906 7 14.5469V25.4609C7 29.6094 10.3906 33 14.5469 33H25.4609C29.6094 33 33 29.6094 33 25.4531V14.5469C33 10.3906 29.6094 7 25.4531 7H14.5469ZM14.5469 9H25.4531C28.5313 9 31 11.4688 31 14.5469V25.4531C31 28.5313 28.5312 31 25.4609 31H14.5469C11.4688 31 9 28.5312 9 25.4609V14.5469C9 11.4688 11.4688 9 14.5469 9ZM28 11C27.4453 11 27 11.4453 27 12C27 12.5547 27.4453 13 28 13C28.5547 13 29 12.5547 29 12C29 11.4453 28.5547 11 28 11ZM20 13C16.1484 13 13 16.1484 13 20C13 23.8516 16.1484 27 20 27C23.8516 27 27 23.8516 27 20C27 16.1484 23.8516 13 20 13ZM20 15C22.7734 15 25 17.2266 25 20C25 22.7734 22.7734 25 20 25C17.2266 25 15 22.7734 15 20C15 17.2266 17.2266 15 20 15Z" fill="white"/>
                                    </svg>
                                </a>
                            </div>
                            <div className="footer__social-tiktok">
                                <a href="https://www.tiktok.com/@solodkiypar0?_t=8fBZ5KG8G3C&_r=1">
                                    <img src={tiktok} alt="tik-tok" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                2023 Elfbar
                <div className="footer__privacy">
                    <NavLink to='/policy'>{t("footer.agreement")}</NavLink>
                </div>
            </div>
        </footer>
    )
}

export default Footer;