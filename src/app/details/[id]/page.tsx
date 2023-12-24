import { FC } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

import api from '@/app/http';
import { API_KEY } from '@/app/const';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';

import NoImage from '../../static/img/no-image.jpg';

import styles from './styles.module.scss';

export const getBookDetails = async (id: string) => {
	try {
		const response = await api.get(`${id}?key=${API_KEY}`);

		const data = response.data;

		return data;
	} catch (err) {
		return err;
	}
};

interface DetailsProps {
	params: {
		id: string;
	};
}

export const generateMetadata = async ({
	params: { id },
}: DetailsProps): Promise<Metadata> => {
	const book = await getBookDetails(id);

	const { volumeInfo } = book;

	return {
		title: volumeInfo.title,
	};
};

const Details: FC<DetailsProps> = async ({ params: { id } }) => {
	const book = await getBookDetails(id);

	console.log(book);

	const { volumeInfo } = book;

	const authorsList: string[] = volumeInfo.authors;
	const largeBookImage = volumeInfo.imageLinks?.large;
	const mediumBookImage = volumeInfo.imageLinks?.medium;
	const smallBookImage = volumeInfo.imageLinks?.small;
	const thumbnailBookImage = volumeInfo.imageLinks?.thumbnail;

	return (
		<div className={styles.main}>
			<Container>
				<Heading className={styles.mainTitle} text={volumeInfo.title} />
				<div className={styles.mainFlex}>
					<div className={styles.mainFlexLeft}>
						<Image
							className={styles.mainFlexLeftImg}
							src={
								largeBookImage ||
								mediumBookImage ||
								smallBookImage ||
								thumbnailBookImage ||
								NoImage
							}
							height={400}
							width={400}
							alt='book image'
						/>
					</div>

					<div className={styles.mainFlexRight}>
						<p className={styles.mainFlexRightCategory}>
							{volumeInfo.categories && volumeInfo.categories[0]}
						</p>

						<Heading
							className={styles.mainFlexRightTitle}
							tag='h2'
							text={volumeInfo.subtitle}
						/>

						<div className={styles.mainFlexRightAuthor}>
							{authorsList?.map(author => (
								<span className={styles.mainFlexRightAuthorText} key={author}>
									{author}
								</span>
							))}
						</div>

						<div className={styles.mainFlexRightDescription}>
							{volumeInfo.description?.replace(/[<p>/<b><i><br>]/g, '')}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Details;
