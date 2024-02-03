'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';

import {
	clearMoreBooksList,
	clearStartIndex,
	getMoreBooks,
	getMoreBooksSearchValue,
	getSearchedBooksQuantity,
	increaseStartIndex,
} from './store/getMoreBooksSlice';
import {
	useLazyGetMoreSearchedBooksQuery,
	useLazySearchBooksQuery,
} from './store/googleBooks.api';

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
import NoBooksComponent from './components/NoBooksComponent';
import ErrorComponent from './components/ErrorComponent';

import { getRequestErrors } from './utils/getRequestErrors';

import { bookCategories, booksSort } from './mock';

import styles from './page.module.scss';

const HomePageLayout: FC = () => {
	const dispatch = useAppDispatch();

	const [isFirstRequestHappened, setIsFirstRequestHappened] =
		useState<boolean>(false);

	const {
		moreBooksList,
		moreBooksSearchValue,
		searchedBooksQuantity,
		startIndex,
		maxResultsLimit,
	} = useAppSelector(state => state.getMoreBooks);

	const { inputValue, handleFormFieldChange, handleFormReset } = useForm('');

	const {
		booksCategoryValue,
		booksSortValue,
		handleBooksCategoryChange,
		handleBooksSortChange,
	} = useSelect();

	const isFormValid = inputValue.toLowerCase().length > 0;

	const [
		fetchBooks,
		{
			data: booksSearchedResponse,
			isLoading: isSearchBooksLoading,
			isFetching: isSearchBooksFetching,
			isError: isSearchBooksError,
			error: SearchBooksError,
		},
	] = useLazySearchBooksQuery();

	const [
		fetchMoreBooks,
		{
			data: gotMoreBooksResponse,
			isLoading: isGetMoreBooksLoading,
			isFetching: isMoreBooksFetching,
			isError: isMoreBooksError,
			error: moreBooksError,
		},
	] = useLazyGetMoreSearchedBooksQuery();

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		dispatch(clearMoreBooksList());
		dispatch(clearStartIndex());

		if (isFormValid) {
			e.preventDefault();

			fetchBooks({
				searchBooksValue: inputValue,
				category: booksCategoryValue as string,
				startIndex,
				maxResultsLimit,
				sort: booksSortValue as string,
			});

			dispatch(getMoreBooksSearchValue(inputValue));
			dispatch(increaseStartIndex());
			setIsFirstRequestHappened(true);
		}

		handleFormReset();
	};

	const booksList = booksSearchedResponse?.items;
	const gotMoreBooksList = gotMoreBooksResponse?.items;
	const totalBooksSearchedQuantity = booksSearchedResponse?.totalItems;
	const isThereMoreBooksList = moreBooksList.length > 0;
	const isTotalQuantityBooksShow =
		searchedBooksQuantity > 0 && moreBooksList.length > 0;
	const isGetMoreBooksButtonShow =
		moreBooksList.length > 0 && startIndex <= searchedBooksQuantity;
	const isNotFoundAnyBooks = isFirstRequestHappened && booksList === undefined;

	const searchRequestBooksError = getRequestErrors(SearchBooksError);
	const searchRequestMoreBooksError = getRequestErrors(moreBooksError);

	const handleGetMoreBooks = () => {
		setIsFirstRequestHappened(false);

		fetchMoreBooks({
			searchBooksValue: moreBooksSearchValue,
			startIndex,
			maxResultsLimit,
		});

		dispatch(increaseStartIndex());
	};

	useEffect(() => {
		dispatch(getMoreBooks(booksList));
	}, [dispatch, booksList]);

	useEffect(() => {
		dispatch(getMoreBooks(gotMoreBooksList));
	}, [dispatch, gotMoreBooksList]);

	useEffect(() => {
		if (isFirstRequestHappened) {
			dispatch(getSearchedBooksQuantity(totalBooksSearchedQuantity));
		}
	}, [dispatch, isFirstRequestHappened, totalBooksSearchedQuantity]);

	return (
		<main className={styles.main}>
			<div className={styles.mainTop}>
				<Container>
					<div className={styles.mainTopForm}>
						<div className={styles.mainTopFormArea}>
							<Heading
								className={styles.mainTopTitle}
								text='Search for books'
							/>
							<div className={styles.mainTopFormAreaBox}>
								<CustomForm handleSubmit={handleFormSubmit} id='myForm'>
									<SearchInput
										inputValue={inputValue}
										handleChange={handleFormFieldChange}
									/>

									<FormButton
										type='submit'
										form='myForm'
										disabled={!isFormValid}
									>
										<SearchOutlined fontSize='inherit' />
									</FormButton>
								</CustomForm>
							</div>

							<div className={styles.mainTopFormSelectArea}>
								<div className={styles.mainTopFormSelectAreaBox}>
									<p className={styles.mainTopFormSelectAreaBoxText}>
										Categories
									</p>
									<CustomSelect
										array={bookCategories}
										value={booksCategoryValue as string}
										defaultValue='all'
										handleChange={handleBooksCategoryChange}
									/>
								</div>

								<div className={styles.mainTopFormSelectAreaBox}>
									<p className={styles.mainTopFormSelectAreaBoxText}>
										Sorting by
									</p>
									<CustomSelect
										array={booksSort}
										value={booksSortValue as string}
										defaultValue='relevance'
										handleChange={handleBooksSortChange}
									/>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>
			<Container>
				<div className={styles.mainBooksBox}>
					{isSearchBooksLoading || isSearchBooksFetching ? (
						<Loader />
					) : (
						<>
							{isNotFoundAnyBooks ? (
								<ErrorComponent error={'Not found anything'} />
							) : (
								<>
									{isSearchBooksError ? (
										<ErrorComponent error={searchRequestBooksError} />
									) : (
										<>
											{isThereMoreBooksList ? (
												<div className={styles.mainBooksBoxCardsArea}>
													{isTotalQuantityBooksShow && (
														<p className={styles.mainBooksBoxCardsAreaTitle}>
															Found{' '}
															<span
																className={styles.mainBooksBoxCardsAreaResults}
															>
																{searchedBooksQuantity}
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
						</>
					)}
				</div>

				{isGetMoreBooksButtonShow && (
					<div className={styles.mainButtonArea}>
						{isMoreBooksError ? (
							<ErrorComponent error={searchRequestMoreBooksError} />
						) : (
							<CustomButton
								className={styles.mainButtonAreaBtn}
								handleClick={handleGetMoreBooks}
							>
								{isGetMoreBooksLoading || isMoreBooksFetching ? (
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
