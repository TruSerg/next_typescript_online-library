import { configureStore } from '@reduxjs/toolkit';

import { googleBooksApi } from './googleBooks.api';
import getMoreBooksReducer from './getMoreBooksSlice';

export const store = configureStore({
	reducer: {
		[googleBooksApi.reducerPath]: googleBooksApi.reducer,

		getMoreBooks: getMoreBooksReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(googleBooksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
