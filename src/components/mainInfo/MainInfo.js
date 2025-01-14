import { useTranslation } from 'react-i18next';
import TitleH1 from '../titleH1/TitleH1';

import './mainInfo.scss'

const MainInfo = () => {
    const { t } = useTranslation()

    return (
        <div className="info-advantages">
            <TitleH1 title={`${t("info.first_title")}`} classN="info-advantages__title"/>
            <p className="info-advantages__text">{t("info.first-text")}</p>
            <div className="info-advantages__subtitle">{t("info.second_title")}</div>
            <p className="info-advantages__text">{t("info.second_text")}</p>
            <div className="info-advantages__subtitle">{t("info.third_title")}</div>
            <p className="info-advantages__text">{t("info.third_text")}</p>
            <div className="info-advantages__subtitle">{t("info.forth_title")}</div>
            <p className="info-advantages__text">{t("info.forth_text")}</p>
        </div>
    )
}

export default MainInfo;