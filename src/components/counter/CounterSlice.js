import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 1
};

const productCounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        increaceCounter: (state) => {state.counter += 1},
        decreaceCounter: (state) => {state.counter > 2 ? state.counter -= 1 : state.counter = 1}
    },
});

export const {actions, reducer} = productCounterSlice;
export default reducer;
export const { increaceCounter, decreaceCounter } = actions;