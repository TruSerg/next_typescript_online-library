import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Container from '../Container';
import Logo from '../../../../public/logo.svg';

import styles from './styles.module.scss';

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.headerFlex}>
					<Link
						href={'https://developers.google.com/books'}
						rel='noopener noreferrer'
						target='_blank'
					>
						<Image className={styles.headerFlexLogo} src={Logo} alt={'logo'} />
					</Link>
					<h2 className={styles.headerFlexTitle}>Google Books Library</h2>
				</div>
			</Container>
		</header>
	);
};

export default Header;
