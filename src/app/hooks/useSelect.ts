import { FocusEvent, KeyboardEvent, MouseEvent, useState } from 'react';

const useSelect = () => {
	const [booksCategoryValue, setBooksCategoryValue] = useState<string | null>(
		'all'
	);
	const [booksSortValue, setBooksSortValue] = useState<string | null>(
		'relevance'
	);

	const handleBooksCategoryChange = (
		e:
			| MouseEvent<Element, globalThis.MouseEvent>
			| KeyboardEvent<Element>
			| FocusEvent<Element, Element>
			| null,
		value: string | null
	) => {
		setBooksCategoryValue(value);
	};

	const handleBooksSortChange = (
		e:
			| MouseEvent<Element, globalThis.MouseEvent>
			| KeyboardEvent<Element>
			| FocusEvent<Element, Element>
			| null,
		value: string | null
	) => {
		setBooksSortValue(value);
	};

	return {
		booksCategoryValue,
		booksSortValue,
		handleBooksCategoryChange,
		handleBooksSortChange,
	};
};

export default useSelect;
