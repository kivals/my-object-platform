import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/header/Header';

import { auth } from '@/auth';

export const metadata: Metadata = {
	title: 'Dashboard'
};

export default async function Layout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	const session = await auth();

	return (
		<div className='flex flex-col min-h-screen'>
			<Header session={session} />
			<Container>{children}</Container>
		</div>
	);
}
