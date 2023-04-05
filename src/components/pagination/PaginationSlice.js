import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentPage: 0,
    currentPageData: []
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {state.currentPage = action.payload},
        setCurrentPageData: (state, action) => {state.currentPageData = action.payload}
    },
});


const {actions, reducer} = paginationSlice;
export const { setCurrentPage, setCurrentPageData } = actions;
export default reducer;