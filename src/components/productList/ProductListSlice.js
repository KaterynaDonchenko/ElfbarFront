import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    products: []
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(fetchProductsCategory.fulfilled, (state, action) => {
                state.products = action.payload;
            })
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

const {actions, reducer} = productsSlice;

export default reducer;

