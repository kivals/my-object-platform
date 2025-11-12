import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/header/Header';

export default async function DashboardLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<Container>
			<div className='flex flex-col min-h-screen'>
				<Header />
				{children}
			</div>
		</Container>
	);
}
