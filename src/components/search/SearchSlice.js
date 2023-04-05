import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    search: '',
    searchResult: [],
    serchResultLoadingStatus: 'idle',
    searchResultForSearchPage: []
}

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, actions) => {state.search = actions.payload},
        cleareSearchResult: state => {state.searchResult = []},
        setSearchResultForSearchPage: (state, actions) => {state.searchResultForSearchPage = actions.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, state => {state.serchResultLoadingStatus = 'loading'})
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.serchResultLoadingStatus = 'idle';
                state.searchResult = action.payload;
            })
            .addCase(fetchSearch.rejected, state => {state.serchResultLoadingStatus = 'error'})
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
export const { setSearch, cleareSearchResult, setSearchResultForSearchPage } = actions;

export default reducer;

