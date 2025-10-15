import type { ReactNode } from 'react';

import { Sidebar } from '@/components/sidebar/Sidebar';

export default function DashboardLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div className='flex gap-x-8'>
			<Sidebar />
			<main className='flex-1'>{children}</main>
		</div>
	);
}
