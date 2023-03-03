import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    product: {},
    productLoadingStatus: 'idle',
    categoryInfoLoadingStatus: 'idle',
    categoryInfo: {},
    characteristic: [{'icon': 'img/info/strong.svg', 'title': 'Міцність'}, 
           {'icon': 'img/info/man.svg', 'title': 'Тяг'}, 
           {'icon': 'img/info/volume.svg', 'title': 'Рідина'}, 
           {'icon': 'img/info/batterysvg.svg', 'title': 'Батарея'}],
    tastes: [],
    tastesLoadingStatus: 'idle',
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
            .addCase(fetchCategoryInfo.pending, state => {state.categoryInfoLoadingStatus = 'loading'})
            .addCase(fetchCategoryInfo.fulfilled, (state, action) => {
                state.categoryInfoLoadingStatus = 'idle';
                state.categoryInfo = action.payload;
            })
            .addCase(fetchCategoryInfo.rejected, state => {state.categoryInfoLoadingStatus = 'error'})
            .addCase(fetchTastes.pending, state => {state.tastesLoadingStatus = 'loading'})
            .addCase(fetchTastes.fulfilled, (state, action) => {
                state.tastesLoadingStatus = 'idle';
                state.tastes = action.payload;
            })
            .addCase(fetchTastes.rejected, state => {state.tastesLoadingStatus = 'error'})
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

export const fetchCategoryInfo = createAsyncThunk(
    'product/fetchCategoryInfo',
    (category) => {
        const request = useHttp();
        return request(`http://localhost:3001/categoryInfo/${category}`);
    }
);

export const fetchTastes = createAsyncThunk(
    'product/fetchTastes',
    (category) => {
        const request = useHttp();
        return request(`http://localhost:3001/taste/${category}`);
    }
);

const {actions, reducer} = productSlice;
export default reducer;
