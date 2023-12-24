'use client';

import Container from '@/app/components/Container';
import ErrorComponent from '@/app/components/ErrorComponent';

import styles from './styles.module.scss';

const ErrorWrapper = ({ error }: { error: Error }) => {
	return (
		<Container>
			<div className={styles.errorWrapper}>
				<ErrorComponent error={error.message} />
			</div>
		</Container>
	);
};

export default ErrorWrapper;
