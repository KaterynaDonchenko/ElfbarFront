import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    productsCategory: [],
    productsTop: [],
    productsNew: [],
    productsCategoryLoadingStatus: 'idle',
    productsWithLableLoadingStatus: 'idle',
    productsCategoryAfterLoading: ''
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsCategory.pending, state => {
                state.productsCategoryAfterLoading = '';
                state.productsCategoryLoadingStatus = 'loading';
            })
            .addCase(fetchProductsCategory.fulfilled, (state, action) => {
                state.productsCategoryLoadingStatus = 'idle';
                state.productsCategory = action.payload;
                state.productsCategory.length > 0 ? state.productsCategoryAfterLoading = 'full' : state.productsCategoryAfterLoading = 'empty';
            })
            .addCase(fetchProductsCategory.rejected, state => {
                state.productsCategoryAfterLoading = '';
                state.productsCategoryLoadingStatus = 'error';
            })
            .addCase(fetchProductsWithTheLable.pending, state => {state.productsWithLableLoadingStatus = 'loading'})
            .addCase(fetchProductsWithTheLable.fulfilled, (state, action) => {
                const lable = action.payload[0].lable;
                state.productsWithLableLoadingStatus = 'idle';
                lable === 'топ' ? state.productsTop = action.payload : state.productsNew = action.payload;
            })
            .addCase(fetchProductsWithTheLable.rejected, state => {state.productsWithLableLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

export const fetchProductsCategory = createAsyncThunk(
    'products/fetchProductsCategory',
    async (category) => {
        const request = useHttp();
        return await request(`http://localhost:3001/products/category/${category}`);
    }
);

export const fetchProductsWithTheLable = createAsyncThunk(
    'products/fetchProductsWithTheLable',
    async (lable) => {
        const request = useHttp();
        return await request(`http://localhost:3001/products/lable/${lable}`);
    }
)

const {actions, reducer} = productsSlice;

export default reducer;

