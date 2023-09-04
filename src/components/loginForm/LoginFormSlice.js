import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    user: {},
    isAuth: false,
    userLoadingStatus: 'idle',
    accessToken: null
}

const LoginFormSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        onSetAuthorization: (state, action) => {state.isAuth = action.payload}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLogin.pending, state => {state.userLoadingStatus = 'loading'})
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                state.user = action.payload;
                state.isAuth = true;
                state.accessToken = action.payload.accessToken;
                sessionStorage.setItem('isAuth', true);
            })
            .addCase(fetchLogin.rejected, state => {state.userLoadingStatus = 'error'}) 
            .addCase(fetchRegistration.pending, state => {state.userLoadingStatus = 'loading'})
            .addCase(fetchRegistration.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                state.user = action.payload;
                state.isAuth = true;
                state.accessToken = action.payload.accessToken;
                sessionStorage.setItem('isAuth', true);
            })
            .addCase(fetchRegistration.rejected, state => {state.userLoadingStatus = 'error'})
            .addCase(fetchLogout.pending, state => {state.userLoadingStatus = 'loading'})
            .addCase(fetchLogout.fulfilled, state => {
                state.userLoadingStatus = 'idle';
                state.user = {};
                state.isAuth = false;
                state.accessToken = null;
                sessionStorage.removeItem('isAuth');
            })
            .addCase(fetchLogout.rejected, state => {state.userLoadingStatus = 'error'})  
            .addCase(checkAuth.pending, state => {state.userLoadingStatus = 'loading'})
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                state.user = action.payload;
                state.isAuth = true;
                state.accessToken = action.payload.accessToken;
                sessionStorage.setItem('isAuth', true);
            })
            .addCase(checkAuth.rejected, state => {state.userLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

export const fetchLogin = createAsyncThunk(
    'loginForm/fetchLoginForm',
    (body) => {
        const request = useHttp();
        return request(`http://solodkiypar.com.ua:3001/admin/login`, 'POST', JSON.stringify({email: body.email, password: body.password}), 
        {'Content-Type': 'application/json', 'Authorization': `Bearer ${body.accessToken}`});
    }
);

export const fetchRegistration = createAsyncThunk(
    'loginForm/fetchRegistration',
    (body) => {
        const request = useHttp();
        return request(`http://solodkiypar.com.ua:3001/admin/registration`, 'POST', JSON.stringify({email: body.email, password: body.password}), 
        {'Content-Type': 'application/json', 'Authorization': `Bearer ${body.accessToke}`});
    }
)

export const fetchLogout = createAsyncThunk(
    'loginForm/fetchLogout',
    () => {
        const request = useHttp();
        return request(`http://solodkiypar.com.ua:3001/admin/logout`, 'POST', JSON.stringify({}),  
        {'Content-Type': 'application/json'})
    }
)

export const checkAuth = createAsyncThunk(
    'loginForm/checkAuth',
    () => {
        const request = useHttp();
        return request(`http://solodkiypar.com.ua:3001/admin/refresh`);
    }
)

const {reducer, actions} = LoginFormSlice;
export const { onSetAuthorization } = actions;
export default reducer;
