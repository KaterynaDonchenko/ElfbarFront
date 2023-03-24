import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    products: [],
    productsTop: [],
    productsNew: [],
    productsLoadingStatus: 'idle'
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, state => {state.productsLoadingStatus = 'loading'})
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsLoadingStatus = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, state => {state.productsLoadingStatus = 'error'})
            .addCase(fetchProductsCategory.pending, state => {state.productsLoadingStatus = 'loading'})
            .addCase(fetchProductsCategory.fulfilled, (state, action) => {
                state.productsLoadingStatus = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProductsCategory.rejected, state => {state.productsLoadingStatus = 'error'})
            .addCase(fetchProductsWithTheLable.pending, state => {state.productsLoadingStatus = 'loading'})
            .addCase(fetchProductsWithTheLable.fulfilled, (state, action) => {
                state.productsLoadingStatus = 'idle';
                action.payload.length > 5 ? state.productsTop = action.payload : state.productsNew = action.payload;
            })
            .addCase(fetchProductsWithTheLable.rejected, state => {state.productsLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const request = useHttp();
        return await request("http://localhost:3001/getProducts");
    }
);

export const fetchProductsCategory = createAsyncThunk(
    'products/fetchProductsCategory',
    async (category) => {
        const request = useHttp();
        return await request(`http://localhost:3001/productCategory/${category}`);
    }
);

export const fetchProductsWithTheLable = createAsyncThunk(
    'products/fetchProductsWithTheLable',
    async (lable) => {
        const request = useHttp();
        return await request(`http://localhost:3001/getProducts/${lable}`);
    }
)

const {actions, reducer} = productsSlice;

export default reducer;

