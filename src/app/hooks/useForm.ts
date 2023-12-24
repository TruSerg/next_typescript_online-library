import { useState, useCallback, ChangeEvent } from 'react';

const useForm = (initialValue: any) => {
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
