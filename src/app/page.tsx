'use client';

import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';

import { searchBooks } from './store/searchBooksSlice';

import { useForm, useSelect } from './hooks';
import { useAppDispatch, useAppSelector } from './hooks/useStoreHooks';

import Container from '@/app/components/Container';
import Heading from './components/Heading';
import CustomForm from './components/CustomForm';
import SearchInput from './components/Inputs/SearchInput';
import CustomButton from './components/Buttons/CustomButton';
import CustomCard from './components/Card';
import CustomSelect from './components/Select';
import Loader from './components/Loader';
import FormButton from './components/Buttons/FormButton';
import BackToTopButton from './components/Buttons/BackToTopButton';
import NoBooksComponent from './components/NoBooks';
import ErrorComponent from './components/ErrorComponent';

import { bookCategories, booksSort } from './mock';

import {
	getBooksOfFirstRequest,
	getMoreBooks,
	getMoreBooksSearchValue,
	moreBooksListClearOfNewSearchRequest,
} from './store/getMoreBooksSlice';

import styles from './page.module.scss';

const HomePageLayout: FC = () => {
	const dispatch = useAppDispatch();

	const [maxLimitResults] = useState<number>(30);
	const [startIndex, setStartIndex] = useState<number>(0);

	const {
		booksResponse,
		booksList,
		totalBooksSearchedQuantity,
		SearchBooksError,
		isSearchBooksError,
		isSearchBooksLoading,
	} = useAppSelector(state => state.searchBooks);

	const {
		moreBooksList,
		moreBooksSearchValue,
		getMoreBooksError,
		isGetMoreBooksError,
		isMoreBooksLoading,
	} = useAppSelector(state => state.getMoreBooks);

	const { inputValue, handleFormFieldChange, handleFormReset } = useForm('');

	const {
		booksCategoryValue,
		booksSortValue,
		handleBooksCategoryChange,
		handleBooksSortChange,
	} = useSelect();

	console.log(booksResponse);

	const isFormValid = inputValue.toLowerCase().length > 0;

	const handleFormSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			if (isFormValid) {
				e.preventDefault();

				dispatch(
					searchBooks([
						inputValue,
						booksCategoryValue,
						startIndex,
						maxLimitResults,
						booksSortValue,
					])
				);

				dispatch(getMoreBooksSearchValue(inputValue));
			}

			handleFormReset();
		},

		[
			dispatch,
			isFormValid,
			inputValue,
			booksCategoryValue,
			startIndex,
			maxLimitResults,
			booksSortValue,
			handleFormReset,
		]
	);

	const handleGetMoreBooks = useCallback(() => {
		setStartIndex(startIndex + maxLimitResults);

		dispatch(
			getMoreBooks([
				moreBooksSearchValue,
				booksCategoryValue,
				startIndex,
				maxLimitResults,
				booksSortValue,
			])
		);
	}, [
		dispatch,
		moreBooksSearchValue,
		booksCategoryValue,
		startIndex,
		maxLimitResults,
		booksSortValue,
	]);

	useEffect(() => {
		dispatch(getBooksOfFirstRequest(booksList));
		setStartIndex(startIndex + maxLimitResults);
	}, [dispatch, booksList]);

	useEffect(() => {
		dispatch(moreBooksListClearOfNewSearchRequest());
		setStartIndex(0);
	}, [dispatch, inputValue]);

	const isTotalQuantityBooksShow =
		totalBooksSearchedQuantity > 0 && moreBooksList?.length > 0;

	const isGetMoreBooksButtonShow =
		moreBooksList?.length > 0 &&
		startIndex <= totalBooksSearchedQuantity &&
		startIndex > 0;

	const isThereMoreBooksList = moreBooksList?.length > 0;

	return (
		<main className={styles.main}>
			<div className={styles.mainTop}>
				<Container>
					<Heading className={styles.mainTopTitle} text='Search for books' />
					<div className={styles.mainTopFormArea}>
						<CustomForm handleSubmit={handleFormSubmit} id='myForm'>
							<SearchInput
								inputValue={inputValue}
								handleChange={handleFormFieldChange}
							/>

							<FormButton type='submit' form='myForm' disabled={!isFormValid}>
								<SearchOutlined fontSize='inherit' />
							</FormButton>
						</CustomForm>
					</div>

					<div className={styles.mainSelectArea}>
						<div className={styles.mainSelectAreaBox}>
							<p className={styles.mainSelectAreaBoxText}>Categories</p>
							<CustomSelect
								array={bookCategories}
								value={booksCategoryValue}
								defaultValue='all'
								handleChange={handleBooksCategoryChange}
							/>
						</div>

						<div className={styles.mainSelectAreaBox}>
							<p className={styles.mainSelectAreaBoxText}>Sorting by</p>
							<CustomSelect
								array={booksSort}
								value={booksSortValue}
								defaultValue='relevance'
								handleChange={handleBooksSortChange}
							/>
						</div>
					</div>
				</Container>
			</div>
			<Container>
				<div className={styles.mainBooksBox}>
					{isSearchBooksLoading ? (
						<Loader />
					) : (
						<>
							{isSearchBooksError ? (
								<ErrorComponent error={SearchBooksError} />
							) : (
								<>
									{isThereMoreBooksList ? (
										<div className={styles.mainBooksBoxCardsArea}>
											{isTotalQuantityBooksShow && (
												<p className={styles.mainBooksBoxCardsAreaTitle}>
													Found{' '}
													<span className={styles.mainBooksBoxCardsAreaResults}>
														{totalBooksSearchedQuantity}
													</span>{' '}
													results
												</p>
											)}
											<div className={styles.mainBooksBoxCardsAreaFlex}>
												{moreBooksList?.map(({ id, volumeInfo }) => (
													<CustomCard
														key={id}
														src={volumeInfo.imageLinks?.smallThumbnail}
														categories={volumeInfo?.categories}
														authors={volumeInfo?.authors}
														title={volumeInfo.title}
														link={`/details/${id}`}
													/>
												))}
											</div>
										</div>
									) : (
										<NoBooksComponent />
									)}
								</>
							)}
						</>
					)}
				</div>

				{isGetMoreBooksButtonShow && (
					<div className={styles.mainButtonArea}>
						{isGetMoreBooksError ? (
							<ErrorComponent error={getMoreBooksError} />
						) : (
							<CustomButton
								className={styles.mainButtonAreaBtn}
								handleClick={handleGetMoreBooks}
							>
								{isMoreBooksLoading ? (
									<Loader className={styles.mainLoader} />
								) : (
									'Load more...'
								)}
							</CustomButton>
						)}
					</div>
				)}
			</Container>

			{isThereMoreBooksList && <BackToTopButton />}
		</main>
	);
};

export default HomePageLayout;
