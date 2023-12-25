import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../http';

import { IBook, ISearchBooks } from '../types';

interface SearchBooksState {
	moreBooksList: IBook[];
	moreBooksSearchValue: string;
	getMoreBooksError: string;
	isGetMoreBooksError: boolean;
	isMoreBooksLoading: boolean;
}

const initialState: SearchBooksState = {
	moreBooksList: [],
	moreBooksSearchValue: '',
	getMoreBooksError: '',
	isGetMoreBooksError: false,
	isMoreBooksLoading: false,
};

export const getMoreBooks = createAsyncThunk(
	'books/getBooks',
	async (
		[
			moreBooksSearchValue,
			category,
			startIndex,
			maxLimitResults,
			sort,
		]: ISearchBooks[],
		{ rejectWithValue }
	) => {
		const categoryValue = `${category}` === 'all' ? '' : `+subject:${category}`;

		try {
			const response = await api.get(
				`?q=${moreBooksSearchValue}${categoryValue}&startIndex=${startIndex}&maxResults=${maxLimitResults}&orderBy=${sort}`
			);

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const getMoreBooksSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		getBooksOfFirstRequest(state, { payload }) {
			state.moreBooksList = [...payload];
		},
		moreBooksListClearOfNewSearchRequest(state) {
			state.moreBooksList = [];
		},
		getMoreBooksSearchValue(state, { payload }) {
			state.moreBooksSearchValue = payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(getMoreBooks.pending, (state: SearchBooksState) => {
			state.isMoreBooksLoading = true;
		});
		builder.addCase(
			getMoreBooks.fulfilled,
			(state: SearchBooksState, { payload }) => {
				state.isMoreBooksLoading = false;
				state.moreBooksList = [...state.moreBooksList, ...payload.items];
			}
		);
		builder.addCase(
			getMoreBooks.rejected,
			(state: SearchBooksState, { payload }) => {
				state.isMoreBooksLoading = false;
				state.isGetMoreBooksError = true;
				state.getMoreBooksError = payload;
			}
		);
	},
});

export const {
	getBooksOfFirstRequest,
	moreBooksListClearOfNewSearchRequest,
	getMoreBooksSearchValue,
} = getMoreBooksSlice.actions;

export default getMoreBooksSlice.reducer;
