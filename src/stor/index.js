import products from '../components/productList/ProductListSlice';
import product from '../components/product/ProductSlice';
import header from '../components/header/HeaderSlice';
import productCard from '../components/productCard/ProductCartSlice';
import cartWidget from '../components/cardWidget/CartWidgetSlice';
import cart from '../components/cart/CartSlice';
import productCounter from '../components/productCounter/ProductCounterSlice';
import checkout from '../components/checkout/CheckoutSlice';
import filterSlider from '../components/sliders/filterSlider/FilterSliderSlice';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
    reducer: {products, product, header, productCard, cartWidget, cart, productCounter, checkout, filterSlider},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'    
});

export default store;