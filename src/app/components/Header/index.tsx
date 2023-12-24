import { FC } from 'react';

import Container from '../Container';

import styles from './styles.module.scss';

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<Container>
				<p className={styles.headerText}>Google Books Library</p>
			</Container>
		</header>
	);
};

export default Header;
