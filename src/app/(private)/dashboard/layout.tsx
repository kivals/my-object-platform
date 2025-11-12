import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { getSidebarData } from '@/components/sidebar/sidebar.data';

import { auth } from '@/auth';

export default async function DashboardLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	const session = await auth();
	if (!session) {
		redirect('/auth/login');
	}

	const sidebarMenu = getSidebarData(session.user.role);

	return (
		<Container>
			<div className='flex gap-x-8'>
				<Sidebar menu={sidebarMenu} />
				<main className='flex-1'>{children}</main>
			</div>
		</Container>
	);
}
