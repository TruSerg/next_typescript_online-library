import { ChangeEvent, FC } from 'react';
import { SelectChangeEvent } from '@mui/material';

import style from './styles.module.scss';

interface FormInputProps {
	type: string;
	value: string;
	name: string;
	placeholder: string;
	handleFieldChange: (
		e: ChangeEvent<HTMLInputElement> | SelectChangeEvent
	) => void;
}

const FormInput: FC<FormInputProps> = ({
	type,
	value,
	name,
	placeholder,
	handleFieldChange,
}) => {
	return (
		<input
			className={style.input}
			type={type}
			value={value}
			name={name}
			placeholder={placeholder}
			onChange={handleFieldChange}
		/>
	);
};

export default FormInput;
