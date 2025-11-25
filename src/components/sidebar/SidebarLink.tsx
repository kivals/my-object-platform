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
	isWork: boolean;
}

export function SidebarLink({ link, icon, title, isActive, isWork }: ISidebarProps) {
	const isExtended = useSidebarOpen();

	return (
		<Link
			href={link}
			className={cn(
				'group flex gap-x-9 items-center text-black font-medium text-h3',
				!isWork && 'cursor-not-allowed'
			)}
		>
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
					'border-transparent': !isActive,
					'text-gray-500': !isWork
				})}
			>
				{title}
			</span>
		</Link>
	);
}
