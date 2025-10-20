import type { ReactNode } from 'react';

import { Sidebar } from '@/components/sidebar/Sidebar';
import { getSidebarData } from '@/components/sidebar/sidebar.data';

export default async function ObjectIdLayout({
	children,
	params
}: {
	children: ReactNode;
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;
	const sidebarMenu = getSidebarData('objects', uuid);

	return (
		<div className='flex gap-x-8'>
			<Sidebar menu={sidebarMenu} />
			<main className='flex-1'>{children}</main>
		</div>
	);
}
