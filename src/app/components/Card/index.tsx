import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
	Card,
	CardActions,
	CardContent,
	CardOverflow,
	Typography,
} from '@mui/joy';

import CustomButton from '../Buttons/CustomButton';

import NoImage from '../../static/img/no-image.jpg';

import styles from './styles.module.scss';

interface CardProps {
	categories: string[];
	authors: string[];
	src: string;
	title: string;
	link: string;
}

const CustomCard: FC<CardProps> = ({
	categories,
	authors,
	src,
	title,
	link,
}) => {
	return (
		<Card className={styles.card} variant='outlined' sx={{ width: 300 }}>
			<CardOverflow>
				<Image
					className={styles.cardImg}
					src={src ?? NoImage}
					height={250}
					width={180}
					alt='book image'
				/>
			</CardOverflow>
			<CardContent>
				{categories?.map(category => (
					<Typography
						className={styles.cardCategory}
						key={category}
						level='body-lg'
					>
						{category}
					</Typography>
				))}
				<Typography className={styles.cardTitle} level='title-lg'>
					{title}
				</Typography>
				<div className={styles.cardAuthor}>
					{authors?.map(author => (
						<Typography
							className={styles.cardAuthorText}
							key={author}
							level='body-md'
						>
							{author}
						</Typography>
					))}
				</div>
			</CardContent>
			<CardActions buttonFlex='0 1 100%'>
				<Link className={styles.cardLink} href={link}>
					<CustomButton className={styles.cardBtn}>Details</CustomButton>
				</Link>
			</CardActions>
		</Card>
	);
};

export default CustomCard;
