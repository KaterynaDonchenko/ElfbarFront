import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import Question from "../components/question/Question";

const QuestionPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay('none'));
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container">
            <Question/>
        </div>
    )
}

export default QuestionPage;