import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import Question from "../components/question/Question";

const QuestionPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
    }, []);

    return (
        <div className="container">
            <Question/>
        </div>
    )
}

export default QuestionPage;