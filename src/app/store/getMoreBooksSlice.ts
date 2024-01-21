import { createSlice } from '@reduxjs/toolkit';

import { IBook } from '../interfaces/searchBooksDataInterfaces';

interface SearchBooksState {
	moreBooksList: IBook[];
	moreBooksSearchValue: any;
	searchedBooksQuantity: number;
	startIndex: number;
	maxResultsLimit: number;
}

const initialState: SearchBooksState = {
	moreBooksList: [],
	moreBooksSearchValue: '',
	searchedBooksQuantity: 0,
	startIndex: 0,
	maxResultsLimit: 30,
};

const getMoreBooksSlice = createSlice({
	name: 'moreBooks',
	initialState,
	reducers: {
		getMoreBooks(state, { payload }) {
			if (payload) {
				state.moreBooksList = [...state.moreBooksList, ...payload];
			}
		},
		increaseStartIndex(state) {
			state.startIndex = state.startIndex + state.maxResultsLimit;
		},
		getMoreBooksSearchValue(state, { payload }) {
			state.moreBooksSearchValue = payload;
		},
		getSearchedBooksQuantity(state, { payload }) {
			state.searchedBooksQuantity = payload;
		},
		clearMoreBooksList(state) {
			state.moreBooksList = [];
			state.startIndex = 0;
		},
	},
});

export const {
	getMoreBooks,
	increaseStartIndex,
	getMoreBooksSearchValue,
	getSearchedBooksQuantity,
	clearMoreBooksList,
} = getMoreBooksSlice.actions;

export default getMoreBooksSlice.reducer;
