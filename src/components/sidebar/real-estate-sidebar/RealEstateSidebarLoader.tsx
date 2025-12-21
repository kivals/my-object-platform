import { notFound } from 'next/navigation';

import { RealEstateSidebar } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebar';

import { getRealEstateByUuid } from '@/domains/real-estate/api/api.server';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import { ApiError } from '@/lib/api/api-error';
import type { Uuid } from '@/types/common';

interface IRealEstateSidebarLoaderProps {
	uuid: Uuid;
}

//todo в рамках одного объекта, часто делает запрос на бек. Посмотреть кеширование запросов.
export async function RealEstateSidebarLoader({ uuid }: IRealEstateSidebarLoaderProps) {
	try {
		const realEstate = await getRealEstateByUuid(uuid);
		const addressLine = `${realEstate?.address.street}, ${realEstate?.address.building}, ${realEstate?.address.city}`;

		return (
			<RealEstateSidebar
				typeLabel={REAL_ESTATE_TYPE_LABELS[realEstate?.type || 'house']}
				address={addressLine}
				area={realEstate?.area}
			/>
		);
	} catch (err) {
		if (err instanceof ApiError && err.status === 404) {
			notFound();
		}
		throw err;
	}
}
