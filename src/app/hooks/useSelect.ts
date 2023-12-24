import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

const useSelect = () => {
	const [booksCategoryValue, setBooksCategoryValue] = useState<string>('all');
	const [booksSortValue, setBooksSortValue] = useState<string>('relevance');

	const handleBooksCategoryChange = (
		e: SelectChangeEvent,
		newValue: string
	) => {
		setBooksCategoryValue(newValue);
	};

	const handleBooksSortChange = (e: SelectChangeEvent, newValue: string) => {
		setBooksSortValue(newValue);
	};

	return {
		booksCategoryValue,
		booksSortValue,
		handleBooksCategoryChange,
		handleBooksSortChange,
	};
};

export default useSelect;
