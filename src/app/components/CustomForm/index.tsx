import { FC, FormEvent, ReactNode } from 'react';

import style from './styles.module.scss';

interface CustomFormProps {
	id: string;
	children: ReactNode;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CustomForm: FC<CustomFormProps> = ({ id, children, handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit} id={id} className={style.form}>
			{children}
		</form>
	);
};

export default CustomForm;
