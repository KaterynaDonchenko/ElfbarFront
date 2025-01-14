import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    productsCategory: [],
    productsTop: [],
    productsNew: [],
    productsCategoryLoadingStatus: 'idle',
    productsWithLabelLoadingStatus: 'idle',
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
            .addCase(fetchProductsWithTheLabel.pending, state => {state.productsWithLabelLoadingStatus = 'loading'})
            .addCase(fetchProductsWithTheLabel.fulfilled, (state, action) => {
                const label = action.payload[0].label;
                state.productsWithLabelLoadingStatus = 'idle';
                label === 'топ' || label === 'Top' ? state.productsTop = action.payload : state.productsNew = action.payload;
            })
            .addCase(fetchProductsWithTheLabel.rejected, state => {state.productsWithLabelLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

export const fetchProductsCategory = createAsyncThunk(
    'products/fetchProductsCategory',
    async ({category, language}) => {
        const request = useHttp();
        return await request(`http://localhost:3001/products/category/${category}?language=${language}`);
    }
);

export const fetchProductsWithTheLabel = createAsyncThunk(
    'products/fetchProductsWithTheLabel',
    async ({label, language}) => {
        const request = useHttp();
        return await request(`http://localhost:3001/products/label/${label}?language=${language}`);
    }
)


const {actions, reducer} = productsSlice;

export default reducer;

