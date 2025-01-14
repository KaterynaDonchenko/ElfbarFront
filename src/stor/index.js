import products from '../components/productList/ProductListSlice';
import product from '../components/product/ProductSlice';
import header from '../components/header/HeaderSlice';
import cartWidget from '../components/cartWidget/CartWidgetSlice';
import counter from '../components/counter/CounterSlice';
import checkout from '../components/checkout/CheckoutSlice';
import filterSlider from '../components/sliders/filterSlider/FilterSliderSlice';
import productsPrevAndNext from '../components/breadCrumbsMenu/BreadCrumbsMenuSlice';
import question from '../components/question/QuestionSlice';
import search from '../components/search/SearchSlice';
import filter from '../components/filters/FilterSlice';
import pagination from '../components/pagination/PaginationSlice';
import loginForm from '../components/loginForm/LoginFormSlice';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
    reducer: {products, 
              product, 
              header, 
              cartWidget, 
              counter, 
              checkout, 
              filterSlider,
              question,
              search,
              filter,
              pagination, 
              productsPrevAndNext,
              loginForm  
            },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'    
});

export default store;