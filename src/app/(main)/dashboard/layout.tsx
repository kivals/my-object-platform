import type { ReactNode } from 'react';

import { Sidebar } from '@/components/sidebar/Sidebar';

export default function DashboardLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div className='flex'>
			<Sidebar />
			<main>{children}</main>
		</div>
	);
}
