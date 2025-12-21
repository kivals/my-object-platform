'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon } from '@/ui/Icon';

import { cn } from '@/utils/cn';

interface IFileCardProps {
	name: string;
	onClick: () => void;
	classNameContainer?: string;
	classNameIcon?: string;
	badge?: ReactNode;
	url?: string;
}

export function FileCard({
	name,
	onClick,
	classNameContainer,
	classNameIcon,
	badge,
	url
}: IFileCardProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				'flex flex-col justify-between relative w-[200px] h-[256px] px-2 py-3 rounded-[15px]',
				classNameContainer
			)}
		>
			<div className='flex items-center justify-between'>
				{badge && badge}
				{url && (
					<Link onClick={e => e.stopPropagation()} className='ml-auto' href={url}>
						<Icon className='text-[#868686]' icon='Download' size={25} />
					</Link>
				)}
			</div>

			<Icon
				className={cn(
					'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
					classNameIcon
				)}
				icon='FileTextIcon'
				size={85}
				strokeWidth={1}
			/>
			<span className='truncate text-wrap text-body font-medium'>{name}</span>
		</div>
	);
}
