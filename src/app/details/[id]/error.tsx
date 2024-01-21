'use client';

import Container from '@/app/components/Container';
import ErrorComponent from '@/app/components/ErrorComponent';

import styles from './styles.module.scss';

const ErrorWrapper = () => {
	return (
		<Container>
			<div className={styles.errorWrapper}>
				<ErrorComponent error={'Not found details'} />
			</div>
		</Container>
	);
};

export default ErrorWrapper;
