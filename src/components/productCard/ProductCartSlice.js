import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userProductCart: []
};

const productCardSlice = createSlice({
    name: 'productCart',
    initialState,
    reducers:{
        saveUserProductCart: (state, action) => {
            const newProductId = action.payload._id;
            const newCounter = action.payload.counter
            const isProductInTheCart = state.userProductCart.filter(item => item._id == newProductId).length > 0;
            if (isProductInTheCart) 
                state.userProductCart.map(item => item.counter = item._id != newProductId ? item.counter : 
                newCounter > 1 ? item.counter += newCounter : item.counter +=1 );
            else {
                state.userProductCart.push({_id: action.payload._id, title: action.payload.title, img: action.payload.img, 
                price: action.payload.price, counter: action.payload.counter ? action.payload.counter : 1});
            }
        },
        removeProductFromTheCart: (state, action) => {
            const productId = action.payload;
            state.userProductCart = state.userProductCart.filter(item => item._id !== productId);
        },
        increaseCounter: (state, action) => {
            const productId = action.payload;
            state.userProductCart.map(item => item.counter = item._id === productId ? item.counter +=1 : item.counter);
        },
        decreaseCounter: (state, action) => {
            const productId = action.payload;
            state.userProductCart.map(item => item.counter = item._id !== productId ? item.counter : item.counter > 1 ? 
            item.counter -=1 : state.userProductCart = state.userProductCart.filter(item => item._id !== productId));
        }
    },
});

export const {actions, reducer} = productCardSlice;
export default reducer;
export const { saveUserProductCart, removeProductFromTheCart, increaseCounter, decreaseCounter } = actions;
