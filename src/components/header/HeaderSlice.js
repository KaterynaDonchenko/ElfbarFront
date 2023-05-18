import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartIconDisplay: false,
    mobileMenuDisplay: false
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        changeCartIconDisplay: (state, action) => {state.cartIconDisplay = action.payload},
        changeMobileMenuDisplay: (state, action) => {state.mobileMenuDisplay = action.payload},
    }
});

const {actions, reducer} = headerSlice;
export default reducer;
export const {changeCartIconDisplay, changeMobileMenuDisplay} = actions;

