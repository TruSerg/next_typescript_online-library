import { FC } from 'react';

import Container from '../Container';

import styles from './styles.module.scss';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<p className={styles.footerText}>© 2023 made by Sergey Trukhan</p>
			</Container>
		</footer>
	);
};

export default Footer;
