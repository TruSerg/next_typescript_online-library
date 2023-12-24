import { configureStore } from '@reduxjs/toolkit';

import searchBooksReducer from './searchBooksSlice';
import moreBooksReducer from './getMoreBooksSlice';

export const store = configureStore({
	reducer: {
		searchBooks: searchBooksReducer,
		getMoreBooks: moreBooksReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
