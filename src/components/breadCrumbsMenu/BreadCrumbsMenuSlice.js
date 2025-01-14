import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    productPrev: {},
    productNext: {},
    productPrevLoadingStatus: 'idle',
    productNextLoadingStatus: 'idle'
}

const productsPrevAndNext = createSlice({
    name: 'productsPrevAndNext',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductPrev.pending, state => {state.productPrevLoadingStatus = 'loading'})
            .addCase(fetchProductPrev.fulfilled, (state, action) => {
                state.productPrevLoadingStatus = 'idle';
                state.productPrev = action.payload[0];
            })
            .addCase(fetchProductPrev.rejected, state => {state.productPrevLoadingStatus = 'error'})
            .addCase(fetchProductNext.pending, state => {state.productNextLoadingStatus = 'loading'})
            .addCase(fetchProductNext.fulfilled, (state, action) => {
                state.productNextLoadingStatus = 'idle';
                state.productNext = action.payload[0];
            })
            .addCase(fetchProductNext.rejected, state => {state.productNextLoadingStatus = 'error'})
            .addDefaultCase(() => {});     
    }
});

export const fetchProductPrev = createAsyncThunk(
    'productsPrevAndNext/fetchProductPrev',
    ({id, language}) => {
        const request = useHttp();
        return request(`http://localhost:3001/products/prevProduct/${id}?language=${language}`);
    }
);

export const fetchProductNext = createAsyncThunk(
    'productsPrevAndNext/fetchProductNext',
    ({id, language}) => {
        const request = useHttp();
        return request(`http://localhost:3001/products/nextProduct/${id}?language=${language}`);
    }
);

const {actions, reducer} = productsPrevAndNext;
export default reducer;