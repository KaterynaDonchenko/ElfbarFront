import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [
        {
            id: 1,
            title: 'place_order',
            dscr: "description_first",
            open: false,
        },
        {
            id: 2,
            title: 'time',
            dscr: "description_second",
            open: false,
        },
        {
            id: 3,
            title: 'failure',
            dscr: "description_third",
            open: false,
        },
        {
            id: 4,
            title: 'original',
            dscr: "description_forth",
            open: false,
        },
    ] 
}

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: { 
        onOpenQuestion: (state, actions) => {
            state.questions.forEach((item) => {
                if (item.id === actions.payload) item.open = !item.open;
            })
        }
    }
});

const {actions, reducer} = questionSlice;
export const {onOpenQuestion } = actions;
export default reducer;