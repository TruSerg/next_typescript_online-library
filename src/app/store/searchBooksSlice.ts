import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../http';

import { IBooksResponse, IBook, ISearchBooks, IVolumeInfo } from '../types';

interface SearchBooksState {
	booksResponse: {};
	volumeInfo: {};
	booksList: IBook[];
	totalBooksSearchedQuantity: number;
	SearchBooksError: string;
	isSearchBooksError: boolean;
	isSearchBooksLoading: boolean;
}

const initialState: SearchBooksState = {
	booksResponse: {} as IBooksResponse,
	volumeInfo: {} as IVolumeInfo,
	booksList: [],
	totalBooksSearchedQuantity: 0,
	SearchBooksError: '',
	isSearchBooksError: false,
	isSearchBooksLoading: false,
};

export const searchBooks = createAsyncThunk(
	'books/searchBooks',
	async (
		[searchValue, category, startIndex, maxLimitResults, sort]: ISearchBooks[],
		{ rejectWithValue }
	) => {
		const categoryValue = `${category}` === 'all' ? '' : `+subject:${category}`;

		try {
			const response = await api.get(
				`?q=${searchValue}${categoryValue}&startIndex=${startIndex}&maxResults=${maxLimitResults}&orderBy=${sort}`
			);

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const searchBooksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(searchBooks.pending, (state: SearchBooksState) => {
			state.isSearchBooksLoading = true;
		});
		builder.addCase(
			searchBooks.fulfilled,
			(state: SearchBooksState, { payload }) => {
				state.isSearchBooksLoading = false;
				state.booksResponse = payload;
				state.booksList = payload.items;
				state.totalBooksSearchedQuantity = payload.totalItems;
			}
		);
		builder.addCase(
			searchBooks.rejected,
			(state: SearchBooksState, { payload }) => {
				state.isSearchBooksLoading = false;
				state.isSearchBooksError = true;
				state.SearchBooksError = payload;
			}
		);
	},
});

export default searchBooksSlice.reducer;
