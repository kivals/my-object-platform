'use client';

import { BadgeCheck } from 'lucide-react';

import { Sidebar } from '@/components/sidebar/Sidebar';
import { getSidebarData } from '@/components/sidebar/sidebar.data';

import { BackButton } from '@/ui/BackButton';
import { Badge } from '@/ui/Badge';

import { useSidebarOpen } from '@/store/use-ui.store';

import { cn } from '@/utils/cn';

import type { RealEstateTypeLabel } from '@/domains/real-estate/types';
import { DASHBOARD_URL } from '@/routes';

interface IRealEstateSidebarProps {
	uuid: string;
	address: string;
	area?: number;
	typeLabel: RealEstateTypeLabel;
}

export function RealEstateSidebar({ uuid, address, area, typeLabel }: IRealEstateSidebarProps) {
	const sidebarMenu = getSidebarData('real-estate', uuid);
	const isExtended = useSidebarOpen();

	return (
		<div className={cn('flex flex-col gap-y-3.5 w-[400px]', !isExtended && 'w-[95px]')}>
			<div
				className={cn(
					'flex gap-x-5 p-9 bg-white rounded-[40px] shadow-lg',
					!isExtended && 'flex items-center justify-center p-0 w-auto bg-background shadow-none'
				)}
			>
				<BackButton backUrl={DASHBOARD_URL} classNames='shrink-0' />
				{isExtended && (
					<div className='flex flex-col gap-y-2 items-center'>
						<p className='font-medium text-h2 '>{`${typeLabel}, ${area} м²`}</p>
						<p className='break-all text-small'>{address}</p>
					</div>
				)}
			</div>
			{isExtended && (
				<div className='p-9 bg-white rounded-[40px] shadow-lg'>
					<div className='flex gap-x-1.5'>
						<Badge Icon={BadgeCheck} variant='success'>
							{'нет данных'}
						</Badge>
						<Badge> {area} м²</Badge>
					</div>
				</div>
			)}
			<Sidebar menu={sidebarMenu} />
		</div>
	);
}
