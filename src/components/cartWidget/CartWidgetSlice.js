import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    widgetDisplay: 'none',
    total: 0
}

const cartWidgetSlice = createSlice({
    name: 'cartWidget',
    initialState,
    reducers: {
        changeDispalayCartWidget: (state, actions) => {state.widgetDisplay = actions.payload},
        changeTotal: (state, action) => {state.total = action.payload},
    }
});

const {actions, reducer} = cartWidgetSlice;
export default reducer;
export const {changeDispalayCartWidget, changeTotal } = actions;

