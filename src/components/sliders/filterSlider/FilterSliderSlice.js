import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/http.hook';

const initialState = {
    filterSlider: [],
    filterSliderStatus: 'idle'
}

const filterSliderSlice = createSlice({
    name: 'filterSlider',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterSlider.pending, state => {state.filterSliderStatus = 'loading'})
            .addCase(fetchFilterSlider.fulfilled, (state, action) => {
                state.filterSliderStatus = 'idle';
                state.filterSlider = action.payload;
            })
            .addCase(fetchFilterSlider.rejected, state => {state.filterSliderStatus = 'error'})
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
