import { FC, useEffect, useState } from 'react';
import { ArrowCircleUp } from '@mui/icons-material';

import styles from './styles.module.scss';
import { IconButton } from '@mui/joy';

const BackToTopButton: FC = () => {
	const [isBackToTopButtonShow, setIsBackToTopButtonShow] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			window.scrollY > 100
				? setIsBackToTopButtonShow(true)
				: setIsBackToTopButtonShow(false);
		});
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			{isBackToTopButtonShow && (
				<IconButton onClick={scrollToTop} className={styles.btn}>
					<ArrowCircleUp className={styles.btnArrow} />
				</IconButton>
			)}
		</>
	);
};

export default BackToTopButton;
