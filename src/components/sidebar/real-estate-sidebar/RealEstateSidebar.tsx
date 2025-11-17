'use client';

import { BadgeCheck } from 'lucide-react';

import { Sidebar } from '@/components/sidebar/Sidebar';
import { BackButton } from '@/components/sidebar/real-estate-sidebar/BackButton';
import { getSidebarData } from '@/components/sidebar/sidebar.data';

import { Badge } from '@/ui/Badge';

import { useSidebarOpen } from '@/store/use-ui.store';

import { cn } from '@/utils/cn';

import type { RealEstateTypeLabel } from '@/domains/real-estate/types';

interface IRealEstateSidebarProps {
	uuid: string;
	address: string;
	area?: number;
	typeLabel: RealEstateTypeLabel;
}

export function RealEstateSidebar({ uuid, address, area, typeLabel }: IRealEstateSidebarProps) {
	const sidebarMenu = getSidebarData('objects', uuid);
	const isExtended = useSidebarOpen();

	return (
		<div className={cn('flex flex-col gap-y-3.5 w-[400px]', !isExtended && 'w-[95px]')}>
			<div
				className={cn(
					'flex gap-x-5 p-9 bg-white rounded-[40px] shadow-lg',
					!isExtended && 'flex items-center justify-center p-0 w-auto bg-background shadow-none'
				)}
			>
				<BackButton />
				{isExtended && (
					<div className='flex flex-col gap-y-2 items-center'>
						<p className='font-medium text-h2 '>{`${typeLabel}, ${area} м2`}</p>
						<p className='text-small'>{address}</p>
					</div>
				)}
			</div>
			{isExtended && (
				<div className='p-9 bg-white rounded-[40px] shadow-lg'>
					<div className='flex gap-x-1.5'>
						<Badge Icon={BadgeCheck} variant='success'>
							{'нет данных'}
						</Badge>
						<Badge> {area} м2</Badge>
					</div>
				</div>
			)}
			<Sidebar menu={sidebarMenu} />
		</div>
	);
}
