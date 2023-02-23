import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartIconDisplay: 'none'
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        changeCartIconDisplay: (state, action) => {state.cartIconDisplay = action.payload}
    }
});

const {actions, reducer} = headerSlice;
export default reducer;
export const {changeCartIconDisplay} = actions;

