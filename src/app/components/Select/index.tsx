import { FC } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { Option, Select, selectClasses } from '@mui/joy';
import { KeyboardArrowDown } from '@mui/icons-material';

import { ISelectOptions } from '@/app/interfaces/searchBooksDataInterfaces';

import styles from './styles.module.scss';

interface CustomSelectProps {
	array: ISelectOptions[];
	value: string;
	defaultValue?: string;
	placeholderValue?: string;
	handleChange: (e: SelectChangeEvent, newValue: string) => void;
}

const CustomSelect: FC<CustomSelectProps> = ({
	array,
	value,
	defaultValue,
	placeholderValue,
	handleChange,
}) => {
	return (
		<Select
			className={styles.select}
			defaultValue={defaultValue}
			placeholder={placeholderValue}
			indicator={<KeyboardArrowDown />}
			sx={{
				width: 240,
				[`& .${selectClasses.indicator}`]: {
					transition: '0.2s',
					[`&.${selectClasses.expanded}`]: {
						transform: 'rotate(-180deg)',
					},
				},
			}}
			value={value}
			onChange={handleChange}
		>
			{array?.map(({ id, name }) => {
				return (
					<Option key={id} value={name}>
						{name}
					</Option>
				);
			})}
		</Select>
	);
};

export default CustomSelect;
