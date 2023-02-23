import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/http.hook';

const initialState = {
    filterSlider: []
}

const filterSliderSlice = createSlice({
    name: 'filterSlider',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterSlider.fulfilled, (state, action) => {
                state.filterSlider = action.payload;
            })
            .addDefaultCase(() => {});
    }
});

export const fetchFilterSlider = createAsyncThunk(
    'filterSlider/fetchfilterSlider',
    () => {
        const require = useHttp();
        return require('http://localhost:3001/getFilterSlides');
    }
);

const {actions, reducer} = filterSliderSlice;
export default reducer;
