import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/header/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function Layout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
			<div className='flex flex-col min-h-screen'>
				<Header />
				{children}
			</div>
	);
}
