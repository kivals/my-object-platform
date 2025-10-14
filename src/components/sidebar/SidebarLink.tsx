import Link from 'next/link';

import { Icon } from '@/ui/Icon';

import { useSidebarOpen } from '@/store/use-ui.store';

import { cn } from '@/utils/cn';

import type { TLucideIcons } from '@/types/components/lucide.types';

interface ISidebarProps {
	link: string;
	icon: TLucideIcons;
	title: string;
	isActive: boolean;
}

export function SidebarLink({ link, icon, title, isActive }: ISidebarProps) {
	const isExtended = useSidebarOpen();

	return (
		<Link className='group flex gap-x-9 items-center text-black font-medium text-h3' href={link}>
			<Icon
				classNames={cn('group-hover:text-primary transition group-hover:rotate-6 min-w-6', {
					'text-primary': isActive && !isExtended
				})}
				icon={icon}
				size={24}
			/>
			<span
				className={cn('border-b-2 py-1 whitespace-nowrap', {
					'border-primary': isActive,
					'border-transparent': !isActive
				})}
			>
				{title}
			</span>
		</Link>
	);
}
