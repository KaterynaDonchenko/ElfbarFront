import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import { useHttpNovaPoshta } from "../../hooks/httpNovaPoshta.hook";

const initialState = {
    cities: [],
    warehouses: [],
    cityLoadingStatus: 'idle',
    cityLoadingWarehouses: 'idle'
}

const CheckoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        onChangeWarehouse: (state, actions) => {
            state.warehouses = actions.payload.arr.filter(item => actions.payload.input.length > 0 ?
                 item.warehouses.toLowerCase().indexOf(actions.payload.input.toLowerCase()) > -1 : item);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCity.pending, state => {state.cityLoadingStatus = 'loading'})
            .addCase(fetchCity.fulfilled, (state, actions)=> {
                state.cityLoadingStatus = 'idle';
                state.cities = actions.payload;
            })
            .addCase(fetchCity.rejected, state => {state.cityLoadingStatus = 'error'})
            .addCase(fetchWarehouses.pending, state => {state.cityLoadingWarehouses = 'loading'})
            .addCase(fetchWarehouses.fulfilled, (state, actions)=> {
                state.cityLoadingWarehouses = 'idle';
                state.warehouses = actions.payload;
            })
            .addCase(fetchWarehouses.rejected, state => {state.cityLoadingWarehouses = 'error'})
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
    (city) => {
        const { getCities } = useHttpNovaPoshta();
        return getCities(city.marker, city.name)
    }
);

export const fetchWarehouses = createAsyncThunk(
    'checkout/fetchWarehouses',
    (city) => {
        const { getWarehouses } = useHttpNovaPoshta();
        return getWarehouses(city.marker, city.cityRef)
    }
)

const {actions, reducer} = CheckoutSlice;
export const { onChangeWarehouse } = actions;
export default reducer;


