import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../http';

import { IBook, ISearchBooks } from '../types';

interface SearchBooksState {
	moreBooksList: IBook[];
	moreBooksSearchValue: string;
	isMoreBooksLoading: boolean;
}

const initialState: SearchBooksState = {
	moreBooksList: [],
	moreBooksSearchValue: '',
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
			state.moreBooksList.push(...payload);

			localStorage.setItem('booksList', JSON.stringify(state.moreBooksList));
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

				localStorage.setItem('booksList', JSON.stringify(state.moreBooksList));
			}
		);
		builder.addCase(getMoreBooks.rejected, (state: SearchBooksState) => {
			state.isMoreBooksLoading = false;
		});
	},
});

export const {
	getBooksOfFirstRequest,
	moreBooksListClearOfNewSearchRequest,
	getMoreBooksSearchValue,
} = getMoreBooksSlice.actions;

export default getMoreBooksSlice.reducer;
