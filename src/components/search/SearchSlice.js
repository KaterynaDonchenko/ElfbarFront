import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    search: '',
    searchResult: [],
    displaySearchResult: false,
    SearchResultLoadingStatus: 'idle',
    searchResultForSearchPage: []
}

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, actions) => {
            state.search = actions.payload;
            if(actions.payload.length > 0) sessionStorage.setItem('userSearch', JSON.stringify(actions.payload));
        },
        clearSearchResult: state => {state.searchResult = []},
        setSearchResultForSearchPage: (state, actions) => {state.searchResultForSearchPage = actions.payload},
        changeDisplaySearchResult: (state, actions) => {state.displaySearchResult = actions.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, state => {state.SearchResultLoadingStatus = 'loading'})
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.SearchResultLoadingStatus = 'idle';
                state.searchResult = action.payload;
            })
            .addCase(fetchSearch.rejected, state => {state.SearchResultLoadingStatus = 'error'})
    }
});

export const fetchSearch = createAsyncThunk(
    'search/fetchSearch',
    async ({search, language}) => {
        const request = useHttp();
        return await request(`http://localhost:3001/products/search/?s=${search}&language=${language}`);
    }
);

const {actions, reducer} = SearchSlice;
export const { setSearch, clearSearchResult, setSearchResultForSearchPage, changeDisplaySearchResult } = actions;

export default reducer;

