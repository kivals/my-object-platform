import type { Metadata } from 'next';
import { Jura } from 'next/font/google';

import './globals.css';

const jura = Jura({
	variable: '--font-jura',
	subsets: ['latin', 'cyrillic'],
	weight: ['400','500','600','700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Moй объект',
	description: ''
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${jura.variable} font-jura antialiased text-body`}>{children}</body>
		</html>
	);
}
