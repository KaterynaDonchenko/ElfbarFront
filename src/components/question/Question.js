import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { onOpenQuestion } from './QuestionSlice';
import TitleH1 from '../titleH1/TitleH1';

import './question.scss';
import { useTranslation } from 'react-i18next';

const Question = () => {
    const { t } = useTranslation()
    const { questions } = useSelector(state => state.question);
    const dispatch = useDispatch();

    const renderContent = (arr) => {
        return arr.map(({id, title, dscr, open}, i) => {
            return (
                <div className="question__block" key={i}>
                    <div className="question__block-title">{t(`ask-answer.${title}`, title)}</div>
                    <CSSTransition in={open} timeout={300} classNames="question__block-btn">
                        <div onClick={() => {
                                dispatch(onOpenQuestion(id))
                                }}
                                className="question__block-btn">
                        </div>
                    </CSSTransition>
                    <CSSTransition in={open} timeout={300} classNames="question__block-dscr">
                        <div className="question__block-dscr">{t(`ask-answer.${dscr}`, dscr)}</div>
                    </CSSTransition>
                </div>
            )
        })
    }

    const content = renderContent(questions);
    return (
        <div className="question">
            <TitleH1 classN='question__title' title={t("ask-answer.name")}/>
            {content}
        </div>
    )
}

export default Question;