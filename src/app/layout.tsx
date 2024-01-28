import type { Metadata } from 'next';

import { Providers } from './provider';

import Header from './components/Header';
import Footer from './components/Footer';

import './styles/index.scss';

export const metadata: Metadata = {
	title: 'Google Books Library',
	description: 'Developed by Sergey Trukhan',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<div className='wrapper'>
						<Header />

						{children}

						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
