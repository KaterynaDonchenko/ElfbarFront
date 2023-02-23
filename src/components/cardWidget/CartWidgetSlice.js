import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    widgetDisplay: 'none',
    total: 0
}

const cartWidgetSlice = createSlice({
    name: 'cartWidget',
    initialState,
    reducers: {
        showCartWidget: state => {state.widgetDisplay = 'block'},
        hideCartWidget: state => {state.widgetDisplay = 'none'},
        changeTotal: (state, action) => {state.total = action.payload},
    }
});

const {actions, reducer} = cartWidgetSlice;
export default reducer;
export const {showCartWidget, hideCartWidget, changeTotal } = actions;

