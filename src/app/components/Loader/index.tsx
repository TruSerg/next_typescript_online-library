import { FC } from 'react';
import { CircularProgress } from '@mui/material';

import style from './styles.module.scss';

interface loaderProps {
	className?: string;
}

const Loader: FC<loaderProps> = ({ className }) => {
	return (
		<div className={style.loader}>
			<CircularProgress color='inherit' className={className} />
		</div>
	);
};

export default Loader;
