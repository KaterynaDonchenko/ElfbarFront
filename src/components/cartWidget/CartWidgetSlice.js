import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttpArray } from "../../hooks/httpArray.hook";

const initialState = {
    widgetDisplay: 'none',
    total: 0,
    userProductCart: [],
    userProductCartLoadingStatus: 'idle'
}

const cartWidgetSlice = createSlice({
    name: 'cartWidget',
    initialState,
    reducers: {
        changeDispalayCartWidget: (state, actions) => {state.widgetDisplay = actions.payload},
        changeTotal: (state, action) => {state.total = action.payload},
        saveUserProductCart: (state, action) => {
            const newProductId = action.payload._id;
            const newCounter = action.payload.counter;
            const isUserProductCartInLocalStorage = JSON.parse(localStorage.getItem('userProductCart')) || [];
            const isProductInTheCart = state.userProductCart.filter(item => item._id === newProductId).length > 0;

            if (isProductInTheCart) 
                state.userProductCart.map(item => item.counter = item._id !== newProductId ? item.counter : 
                newCounter > 1 ? item.counter += newCounter : item.counter +=1 );
            else {
                state.userProductCart.push({_id: action.payload._id, title: action.payload.title, img: action.payload.img, 
                price: action.payload.price, counter: action.payload.counter ? action.payload.counter : 1});
            }

            if (isUserProductCartInLocalStorage.length > 0) {
                const productId = isUserProductCartInLocalStorage.findIndex(obj => obj.id === newProductId);
                
                productId === -1 ? isUserProductCartInLocalStorage.push({id: newProductId, counter: newCounter ? newCounter : 1}) :
                newCounter > 1 ? isUserProductCartInLocalStorage[productId].counter += newCounter : 
                isUserProductCartInLocalStorage[productId].counter +=1;

                localStorage.setItem('userProductCart', JSON.stringify(isUserProductCartInLocalStorage));
            } else {
                const userProductForLocalStorage = {id: newProductId, counter: newCounter ? newCounter : 1}
                isUserProductCartInLocalStorage.push(userProductForLocalStorage)                                                                    
                localStorage.setItem('userProductCart', JSON.stringify(isUserProductCartInLocalStorage));
            }
        },
        removeProductFromTheCart: (state, action) => {
            const productId = action.payload;
            state.userProductCart = state.userProductCart.filter(item => item._id !== productId);

            let userProductCartInLocalStorage = JSON.parse(localStorage.getItem('userProductCart'));
            userProductCartInLocalStorage = userProductCartInLocalStorage.filter(item => item.id !== productId);
            localStorage.setItem('userProductCart', JSON.stringify(userProductCartInLocalStorage));
        },
        increaseCounterInTheProduct: (state, action) => {
            const productId = action.payload;
            state.userProductCart.map(item => item.counter = item._id === productId ? item.counter +=1 : item.counter);

            const userProductCartInLocalStorage = JSON.parse(localStorage.getItem('userProductCart'));
            userProductCartInLocalStorage.map(item => item.counter = item.id === productId ? item.counter +=1 : item.counter);
            localStorage.setItem('userProductCart', JSON.stringify(userProductCartInLocalStorage));
        },
        decreaseCounterInTheProduct: (state, action) => {
            const productId = action.payload;
            state.userProductCart.map(item => item.counter = item._id !== productId ? item.counter : item.counter > 1 ? 
            item.counter -=1 : state.userProductCart = state.userProductCart.filter(item => item._id !== productId));

            let userProductCartInLocalStorage = JSON.parse(localStorage.getItem('userProductCart'));
            userProductCartInLocalStorage.map(item => item.counter = item.id !== productId ? item.counter : item.counter > 1 ? 
            item.counter -=1 : userProductCartInLocalStorage = userProductCartInLocalStorage.filter(item => item.id !== productId));
            localStorage.setItem('userProductCart', JSON.stringify(userProductCartInLocalStorage));
        },
        cleareUserProductCart: state => {state.userProductCart = []}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchArrayOfProducts.pending, state => {state.userProductCartLoadingStatus = 'loading'})
            .addCase(fetchArrayOfProducts.fulfilled, (state, actions) => {
                state.userProductCartLoadingStatus = 'idle';
                state.userProductCart = actions.payload;
                const existingLocalStorage = JSON.parse(localStorage.getItem('userProductCart'))
                state.userProductCart.map(product => {
                    const productFromLocaleStorage = existingLocalStorage.find(productLocaleStorage => 
                                                                               productLocaleStorage.id === product._id);
                    if (productFromLocaleStorage) product.counter = productFromLocaleStorage.counter;
                });
            })
            .addCase(fetchArrayOfProducts.rejected, state => { state.userProductCartLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

export const fetchArrayOfProducts = createAsyncThunk(
    'cartWidget/fetchArrayOfProducts',
    (arr) => {
        const arrayOfRequests = useHttpArray();
        return arrayOfRequests(arr, 'http://localhost:3001/getProducts/');
    }
)

const {actions, reducer} = cartWidgetSlice;
export default reducer;
export const {changeDispalayCartWidget, 
              changeTotal,
              saveUserProductCart, 
              removeProductFromTheCart, 
              increaseCounterInTheProduct, 
              decreaseCounterInTheProduct,
              cleareUserProductCart} = actions;

