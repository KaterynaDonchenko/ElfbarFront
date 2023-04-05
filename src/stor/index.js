import products from '../components/productList/ProductListSlice';
import product from '../components/product/ProductSlice';
import header from '../components/header/HeaderSlice';
import productCard from '../components/productCard/ProductCartSlice';
import cartWidget from '../components/cartWidget/CartWidgetSlice';
import cart from '../components/cart/CartSlice';
import counter from '../components/counter/CounterSlice';
import checkout from '../components/checkout/CheckoutSlice';
import filterSlider from '../components/sliders/filterSlider/FilterSliderSlice';
import productsPrevAndNext from '../components/breadeCrumbsMenu/BreadCrumbsMenuSlice';
import question from '../components/question/QuestionSlice';
import search from '../components/search/SearchSlice';
import filter from '../components/filters/FilterSlice';
import pagination from '../components/pagination/PaginationSlice';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
    reducer: {products, 
              product, 
              header, 
              productCard, 
              cartWidget, 
              cart, 
              counter, 
              checkout, 
              filterSlider,
              question,
              search,
              filter,
              pagination, 
              productsPrevAndNext},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'    
});

export default store;