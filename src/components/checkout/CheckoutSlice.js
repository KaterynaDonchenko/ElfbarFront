import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import { useHttpNovaPoshta } from "../../hooks/httpNovaPoshta.hook";

const initialState = {
    city: {}
}

const CheckoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCity.fulfilled, (state, action) => {
                state.city = action.payload; 
            })
            .addDefaultCase(() => {});     
    }
});

export const fetchEmail = createAsyncThunk(
    'checkout/fetchEmail',
    (data) => {
        const request = useHttp()
        request('http://localhost:3001/sendEmail', 'POST', data)
    }
);

export const fetchCity = createAsyncThunk(
    'checkout/fetchCity',
    () => {
        const request = useHttpNovaPoshta();
        request()
    }
)

const {actions, reducer} = CheckoutSlice;
export default reducer;


