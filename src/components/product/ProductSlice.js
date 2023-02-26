import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    product: {},
    productLoadingStatus: 'idle'
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, state => {state.productLoadingStatus = 'loading'})
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.productLoadingStatus = 'idle';
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, state => {state.productLoadingStatus = 'error'})
            .addDefaultCase(() => {});     
    }
});

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    (id) => {
        const request = useHttp();
        return request(`http://localhost:3001/getProducts/${id}`);
    }
);

const {actions, reducer} = productSlice;
export default reducer;
