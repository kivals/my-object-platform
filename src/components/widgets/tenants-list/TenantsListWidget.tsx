'use client';

import { useState } from 'react';

import { TenantAdd } from '@/components/widgets/tenants-list/TenantAdd';
import { TenantsHeader } from '@/components/widgets/tenants-list/TenantsHeader';
import { TenantsList } from '@/components/widgets/tenants-list/TenantsList';

import { cn } from '@/utils/cn';

import type { TenantsByRealEstateData } from '@/domains/tenants/api/schema';

interface ITenantsListWidgetProps {
	data: TenantsByRealEstateData;
}

export function TenantsListWidget({ data }: ITenantsListWidgetProps) {
	const isTenantsExists = data.inactiveTenants.length > 0 || data.activeTenants.length > 0;
	const [isAddOpen, setIsAddOpen] = useState(false);

	function handleAddNewTenant() {
		setIsAddOpen(true);
	}

	return (
		<section className='flex flex-1 flex-col'>
			<TenantsHeader onAdd={handleAddNewTenant} />
			<div className={cn('flex-1 flex items-start', !isTenantsExists && 'items-center')}>
				{isTenantsExists ? (
					<TenantsList data={data} />
				) : (
					<h2 className='flex-1 text-center text-primary font-semibold text-h2'>
						Арендаторы пока не добавлены
					</h2>
				)}
			</div>
			<TenantAdd
				title='Создание арендатора по объекту недвижимости'
				isOpen={isAddOpen}
				onClose={handleAddNewTenant}
			/>
		</section>
	);
}
