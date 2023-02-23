import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    product: {}
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.product = action.payload;
            })
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
