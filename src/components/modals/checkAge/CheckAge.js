import { useRef, useEffect } from 'react';

import './checkAge.scss';
import { useTranslation } from 'react-i18next';

const CheckAge = () => {
    const { t } = useTranslation()
    const checkAgeRef = useRef();

    useEffect(() => {
        const isCheckAgeInLocaleStore = JSON.parse(localStorage.getItem('checkAge'));
        if (!isCheckAgeInLocaleStore) checkAgeRef.current.style.display = 'block';
    }, [])

    const onHiddenModel = () => {
        checkAgeRef.current.style.display = 'none';
        localStorage.setItem('checkAge', JSON.stringify(true));
    }

    return (
        <div ref={checkAgeRef} className="check-age">
            <div className="check-age__window">
                <div className="check-age__window-title">{t("modal.question")}</div>
                <div className="check-age__window-subtitle">{t("modal.text")}</div>
                <div className="check-age__btns">
                    <button onClick={onHiddenModel} className="btn check-age__btn">{t("modal.button_yes")}</button>
                    <a href='https://www.google.com/' className="btn check-age__btn check-age__btn_color-grey">{t("modal.button_no")}</a>
                </div>
            </div>
        </div>
    )
}

export default CheckAge;