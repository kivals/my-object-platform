import type { Metadata } from 'next';
import { Jura } from 'next/font/google';
import type { ReactNode } from 'react';

import { ConfirmProvider } from '@/components/confirm/ConfirmProvider';

import { Toaster } from '@/ui/Sonner';

import './globals.css';

const jura = Jura({
	variable: '--font-jura',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	display: 'swap'
});

export const metadata: Metadata = {
	title: {
		default: 'Мойобъект',
		template: 'Мойобъект | %s'
	},
	description: ''
};

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${jura.variable} font-jura antialiased text-body text-text bg-background leading-none`}
			>
				<Toaster />
				<ConfirmProvider>{children}</ConfirmProvider>
			</body>
		</html>
	);
}
