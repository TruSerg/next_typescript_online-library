import { FC, ReactNode } from 'react';
import { Button } from '@mui/joy';

import styles from './styles.module.scss';

interface ButtonProps {
	children: ReactNode;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset' | undefined;
	form?: string | undefined;
	handleClick?: () => void;
}

const FormButton: FC<ButtonProps> = ({
	children,
	type,
	form,
	disabled,
	handleClick,
}) => {
	return (
		<Button
			className={styles.btn}
			variant='outlined'
			type={type}
			form={form}
			disabled={disabled}
			onClick={handleClick}
		>
			{children}
		</Button>
	);
};

export default FormButton;
