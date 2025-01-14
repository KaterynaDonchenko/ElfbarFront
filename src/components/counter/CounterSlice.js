import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 1
};

const productCounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        increaseCounter: (state) => {state.counter += 1},
        decreaseCounter: (state) => {state.counter > 2 ? state.counter -= 1 : state.counter = 1},
        resetCounter: (state) => {state.counter = 1}
    },
});

export const {actions, reducer} = productCounterSlice;
export default reducer;
export const { increaseCounter, decreaseCounter, resetCounter } = actions;