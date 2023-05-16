import { useRef, useEffect } from 'react';

import './checkAge.scss';

const CheckAge = () => {
    const checkAgeRef = useRef();

    useEffect(() => {
        const isCheckAgeInLocaleStore = JSON.parse(localStorage.getItem('checkAge'));
        if (!isCheckAgeInLocaleStore) checkAgeRef.current.style.display = 'block';
    }, [])

    const onHiddeModel = () => {
        checkAgeRef.current.style.display = 'none';
        localStorage.setItem('checkAge', JSON.stringify(true));
    }

    return (
        <div ref={checkAgeRef} className="check-age">
            <div className="check-age__window">
                <div className="check-age__window-title">Вам виповнилось 18 років?</div>
                <div className="check-age__window-subtitle">Щоб використовувати цей веб-сайт, ви повинні підтвердити, що вам 18+ років. Вам виповнилося 18?</div>
                <div className="check-age__btns">
                    <button onClick={onHiddeModel} className="btn check-age__btn">Так, мені є 18</button>
                    <a href='https://www.google.com/' className="btn check-age__btn check-age__btn_color-grey">Ні, мені немає 18</a>
                </div>
            </div>
        </div>
    )
}

export default CheckAge;