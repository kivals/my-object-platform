import type { Metadata } from 'next';
import { Jura } from 'next/font/google';

import './globals.css';

const jura = Jura({
	variable: '--font-jura',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	display: 'swap'
});

export const metadata: Metadata = {
	title: {
		default: 'Мой объект',
		template: 'Мой объект | %s'
	},
	description: ''
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${jura.variable} font-jura antialiased text-body text-text bg-background leading-none`}
			>
				{children}
				{/*//todo надо тут что-то отрисовать */}
				<footer className='h-48'></footer>
			</body>
		</html>
	);
}
