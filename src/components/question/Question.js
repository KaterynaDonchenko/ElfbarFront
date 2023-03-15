import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { onChangeTransform } from './QuestionSlice';
import TitleH1 from '../titleH1/TitleH1';

import './question.scss';

const Question = () => {
    const dscrRef = useRef([]);
    const { question } = useSelector(state => state.question);
    const dispatch = useDispatch();

    const onAddStylesToTheQuestionBlock = (i) => {
        dscrRef.current[i].classList.toggle('question__block-dscr_show');
    }

    const renderContent = (arr) => {
        return arr.map(({title, dscr, transform}, i) => {
            return (
                <div key={i} className="question__block">
                    <div className="question__block-title">{title}</div>
                    <div style={transform} 
                         onClick={() => {
                            onAddStylesToTheQuestionBlock(i);
                            dispatch(onChangeTransform({transform, i}));
                         }}
                         className="question__block-btn"></div>
                    <div ref={el => dscrRef.current[i] = el} className="question__block-dscr">{dscr}</div>
                </div>
            )
        })
    }

    const content = renderContent(question);
    return (
        <div className="question">
            <TitleH1 classN='question__title' title='Питання-Відповідь'/>
                {content}
        </div>
    )
}

export default Question;