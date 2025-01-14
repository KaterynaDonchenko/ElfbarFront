import { Link } from 'react-router-dom';

import TitleH1 from '../titleH1/TitleH1';
import './policy.scss';
import { useTranslation } from 'react-i18next';

const Policy = () => {
    const { t } = useTranslation()

    const formattedText = t("policy.text").split('<br/>').map((item, index) => (
        <span key={index}>
          {item}
          <br/>
        </span>
    ))

    const formattedTerminology = t("policy.terminology").split('<br/>').map((item, index) => {
        if (item.includes("<strong>")) {
            const [beforeStrong, afterStrong] = item.split('</strong>');
            return (
                <>
                    <strong key={index}>{beforeStrong.replace('<strong>', '')}</strong>
                    {afterStrong}
                    <br />
                </>
            );
        } else {
            return (
                <>
                    {item}
                    <br />
                </>
            );
        }
    });

    return (
        <div className="policy">
            <div className="container">
                <TitleH1 title={t("policy.title")} classN='policy__title'/>
                <article className="policy__text">
                    <p>
                        {t("policy.subtitle-first-part")} <strong><Link to='#'>Solodkiypar.com</Link></strong>  {t("policy.subtitle-second-part")}<br/><br/>
                    </p>
                    <p>
                        {formattedTerminology}
                        </p><br/><br/>
                    <p>
                        {formattedText}
                    </p>
                </article>
            </div>
        </div>
    )
}

export default Policy;