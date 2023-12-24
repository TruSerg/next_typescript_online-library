import { FC, ReactNode } from 'react';
import { Button } from '@mui/joy';

interface ButtonProps {
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset' | undefined;
	form?: string | undefined;
	handleClick?: () => void;
}

const CustomButton: FC<ButtonProps> = ({
	children,
	className,
	type,
	form,
	disabled,
	handleClick,
}) => {
	return (
		<Button
			className={className}
			type={type}
			form={form}
			disabled={disabled}
			onClick={handleClick}
		>
			{children}
		</Button>
	);
};

export default CustomButton;
