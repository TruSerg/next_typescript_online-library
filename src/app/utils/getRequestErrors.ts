import { SerializedError } from '@reduxjs/toolkit';

import {
	ISearchBooksErrorObject,
	ISearchBooksDataErrorObject,
} from '../interfaces/searchBooksErrorsInterfaces';

export const getRequestErrors = (
	errorObject:
		| ISearchBooksErrorObject
		| ISearchBooksDataErrorObject
		| SerializedError
		| undefined
) => {
	if (!!errorObject && 'error' in errorObject) {
		return errorObject.error;
	}

	if (!!errorObject && 'data' in errorObject) {
		return errorObject.data.error.errors.map(({ message }) => message);
	}
};
