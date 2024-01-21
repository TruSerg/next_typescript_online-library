import {
	BaseQueryFn,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { API_KEY, BASE_URI } from '../const';

import {
	IBook,
	IBooksResponse,
	ISearchBooks,
} from '../interfaces/searchBooksDataInterfaces';
import {
	ISearchBooksDataErrorObject,
	ISearchBooksErrorObject,
} from '../interfaces/searchBooksErrorsInterfaces';

export const googleBooksApi = createApi({
	reducerPath: 'googleBooks/api',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URI,
	}) as BaseQueryFn<
		string | FetchArgs,
		unknown,
		ISearchBooksErrorObject | ISearchBooksDataErrorObject,
		{}
	>,
	endpoints: builder => ({
		searchBooks: builder.query<IBooksResponse<IBook>, ISearchBooks>({
			query: ({
				searchBooksValue,
				category,
				startIndex,
				maxResultsLimit,
				sort,
			}) => {
				const categoryValue =
					`${category}` === 'all' ? '' : `+subject:${category}`;

				return {
					url: `?q=${searchBooksValue}${categoryValue}&startIndex=${startIndex}&maxResults=${maxResultsLimit}&orderBy=${sort}&key=${API_KEY}`,
				};
			},
		}),
		getMoreSearchedBooks: builder.query<IBooksResponse<IBook>, ISearchBooks>({
			query: ({ searchBooksValue, startIndex, maxResultsLimit }) => {
				return {
					url: `?q=${searchBooksValue}&startIndex=${startIndex}&maxResults=${maxResultsLimit}&key=${API_KEY}`,
				};
			},
		}),
	}),
});

export const { useLazySearchBooksQuery, useLazyGetMoreSearchedBooksQuery } =
	googleBooksApi;
