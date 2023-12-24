import { ChangeEvent, FC } from 'react';
import { Input } from '@mui/joy';

import styles from './styles.module.scss';

interface SearchInputProps {
	inputValue: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = ({ inputValue, handleChange }) => {
	return (
		<Input
			className={styles.input}
			fullWidth
			color='primary'
			type='text'
			name='text'
			placeholder='Enter the book title...'
			value={inputValue}
			onChange={handleChange}
		/>
	);
};

export default SearchInput;
