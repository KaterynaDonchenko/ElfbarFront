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
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        changeSelectMainVarianLoadingStatus: (state, action) => {state.selectMainVarianLoadingStatust = action.payload}
    },
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
            .addDefaultCase(() => {});     
    }
});

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    (id) => {
        const request = useHttp();
        return request(`http://solodkiypar.com.ua:3001/products/${id}`);
    }
);

export const fetchCategoryInfo = createAsyncThunk(
    'product/fetchCategoryInfo',
    (category) => {
        const request = useHttp();
        return request(`http://solodkiypar.com.ua:3001/filterSlides/categoryInfo/${category}`);
    }
);

const {actions, reducer} = productSlice;
export default reducer;
