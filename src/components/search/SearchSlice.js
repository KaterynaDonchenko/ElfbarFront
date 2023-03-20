import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    search: '',
    searchResult: [],
    serchLoadingStatus: 'idle',
    searchItemsForSearchPage: []
}

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, actions) => {state.search = actions.payload},
        cleareSearchResult: state => {state.searchResult = []},
        setSearchItemsForSearchPage: (state, actions) => {state.searchItemsForSearchPage = actions.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, state => {state.serchLoadingStatus = 'loading'})
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.serchLoadingStatus = 'idle';
                state.searchResult = action.payload;
            })
            .addCase(fetchSearch.rejected, state => {state.serchLoadingStatus = 'error'})
    }
});

export const fetchSearch = createAsyncThunk(
    'search/fetchSearch',
    async (search) => {
        const request = useHttp();
        return await request(`http://localhost:3001/search/?s=${search}`);
    }
);

const {actions, reducer} = SearchSlice;
export const { setSearch, cleareSearchResult, setSearchItemsForSearchPage } = actions;

export default reducer;

