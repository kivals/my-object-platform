import React from 'react';

import { RealEstateSidebarLoader } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebarLoader';
import { TenantsListWidget } from '@/components/widgets/tenants-list/TenantsListWidget';

import { getTenantsByRealEstate } from '@/domains/tenants/api/api.server';
import type { Uuid } from '@/types/common';

interface ITenantsByRealEstateLoaderProps {
	uuid: Uuid;
}

export async function TenantsByRealEstateLoader({ uuid }: ITenantsByRealEstateLoaderProps) {
	const tenants = await getTenantsByRealEstate(uuid);

	return (
		<div className='flex gap-x-8 min-w-0'>
			<RealEstateSidebarLoader uuid={uuid} />
			<main className='flex-1 flex flex-col min-w-0'>
				{tenants && <TenantsListWidget data={tenants.data} />}
			</main>
		</div>
	);
}
