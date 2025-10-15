'use client';

import { SidebarMenu } from '@/components/sidebar/SidebarMenu';
import { SIDEBAR_DATA } from '@/components/sidebar/sidebar.data';

import { useSidebarOpen } from '@/store/use-ui.store';

import { cn } from '@/utils/cn';

export function Sidebar() {
	const isExtended = useSidebarOpen();

	return (
		<aside
			className={cn(
				'sticky top-[var(--height-header)] max-h-[calc(100dvh-var(--height-header))] overflow-y-auto w-[400px] bg-white p-9 rounded-[40px] shadow-lg overflow-hidden transition-all duration-250',
				!isExtended && 'w-[95px]'
			)}
		>
			<SidebarMenu menu={SIDEBAR_DATA} />
		</aside>
	);
}
