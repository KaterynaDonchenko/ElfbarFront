import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    search: '',
    searchResult: [],
    displaySearchResult: false,
    serchResultLoadingStatus: 'idle',
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
        cleareSearchResult: state => {state.searchResult = []},
        setSearchResultForSearchPage: (state, actions) => {state.searchResultForSearchPage = actions.payload},
        changeDisplaySearchResult: (state, actions) => {state.displaySearchResult = actions.payload}
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
        return await request(`http://solodkiypar.com.ua:3001/products/search/?s=${search}`);
    }
);

const {actions, reducer} = SearchSlice;
export const { setSearch, cleareSearchResult, setSearchResultForSearchPage, changeDisplaySearchResult } = actions;

export default reducer;

