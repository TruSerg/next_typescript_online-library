export const getBooksDataFromLocalStorage = () => {
	const data = localStorage.getItem('books');

	return data ? JSON.parse(data) : [];
};
