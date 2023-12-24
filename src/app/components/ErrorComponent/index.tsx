import { FC } from 'react';
import Image from 'next/image';

import Heading from '../Heading';

import ErrorImage from '../../static/img/error.jpg';

import styles from './styles.module.scss';

interface ErrorComponentProps {
	error: string;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
	return (
		<div className={styles.errorWrapper}>
			<div className={styles.errorWrapperTitle}>
				<Heading
					tag='h2'
					className={styles.errorWrapperTitleText}
					text={`${error}!`}
				/>
			</div>

			<Image
				className={styles.errorWrapperImg}
				src={ErrorImage}
				width={400}
				height={400}
				alt='Error'
			/>
		</div>
	);
};

export default ErrorComponent;
