import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    filter: 'all',
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
    async (filter) => {
        const request = useHttp();
        return await request(`http://localhost:3001/filter/?orderby=${filter}`);
    }
);

const {actions, reducer} = FilterSlice;
export const { setFilter } = actions;

export default reducer;