import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const filterFromSessionStorage = JSON.parse(sessionStorage.getItem('filter'));

const initialState = {
    filter: filterFromSessionStorage ? filterFromSessionStorage : 'all',
    filterResult: [],
    filterLoadingStatus: 'idle',
}

const FilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, actions) => {state.filter = actions.payload},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilter.pending, state => {state.filterLoadingStatus = 'loading'})
            .addCase(fetchFilter.fulfilled, (state, action) => {
                state.filterLoadingStatus = 'idle';
                state.filterResult = action.payload;
            })
            .addCase(fetchFilter.rejected, state => {state.filterLoadingStatus = 'error'})
    }
});

export const fetchFilter = createAsyncThunk(
    'filter/fetchFilter',
    async ({filter, language}) => {
        const request = useHttp();
        return await request(`http://localhost:3001/products/filter/?orderby=${filter}&language=${language}`);
    }
);

const {actions, reducer} = FilterSlice;
export const { setFilter } = actions;

export default reducer;