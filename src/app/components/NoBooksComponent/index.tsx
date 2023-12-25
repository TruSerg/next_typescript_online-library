import Image from 'next/image';

import NoBooksImage from '../../static/img/searching-book.png';

import styles from './styles.module.scss';

const NoBooksComponent = () => (
	<div>
		<Image
			className={styles.img}
			src={NoBooksImage}
			width={400}
			height={300}
			alt='No books'
		/>
		<p className={styles.text}>Start searching for books!</p>
	</div>
);

export default NoBooksComponent;
