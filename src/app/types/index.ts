export interface IBooksResponse {
	items: IBook[];
	kind: string;
	totalItems: number;
}

export interface IVolumeInfo {
	allowAnonLogging: boolean;
	authors: string[];
	canonicalVolumeLink: string;
	categories: string[];
	contentVersion: string;
	description: string;
	imageLinks: {
		smallThumbnail: string;
		thumbnail: string;
	};
	industryIdentifiers: { type: string; identifier: string }[];
	infoLink: string;
	language: string;
	maturityRating: string;
	pageCount: number;
	panelizationSummary: {
		containsEpubBubbles: boolean;
		containsImageBubbles: boolean;
	};
	previewLink: string;
	printType: string;
	publishedDate: string;
	publisher: string;
	readingModes: {
		image: boolean;
		text: false;
	};
	subtitle: string;
	title: string;
}

export interface IBook {
	accessInfo: {
		accessViewStatus: string;
		country: string;
		embeddable: boolean;
		epub: {
			isAvailable: boolean;
		};
		pdf: {
			isAvailable: boolean;
		};
		publicDomain: boolean;
		quoteSharingAllowed: false;
		textToSpeechPermission: string;
		viewability: string;
		webReaderLink: string;
	};
	etag: string;
	id: string;
	kind: string;
	saleInfo: {
		country: string;
		isEbook: boolean;
		saleability: string;
	};
	searchInfo: {
		textSnippet: string;
	};
	selfLink: string;
	volumeInfo: IVolumeInfo;
}

export interface ISearchBooks {
	searchBooksValue: string;
	category: string;
	startIndex: number;
	maxResultsLimit: number;
	sort: string;
}

export interface ISelectOptions {
	id: number;
	name: string;
}
