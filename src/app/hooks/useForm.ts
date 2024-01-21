import { useState, useCallback, ChangeEvent } from 'react';

const useForm = (initialValue: string) => {
	const [inputValue, setInputValue] = useState(initialValue);

	const handleFormFieldChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
		},
		[]
	);

	const handleFormReset = () => {
		setInputValue(initialValue);
	};

	return {
		inputValue,
		handleFormFieldChange,
		handleFormReset,
	};
};

export default useForm;
