import { RealEstateSidebar } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebar';

import { getRealEstateByUuid } from '@/domains/real-estate/api/api.server';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import type { Uuid } from '@/types/common';

interface IRealEstateSidebarLoaderProps {
	uuid: Uuid;
}

export async function RealEstateSidebarLoader({ uuid }: IRealEstateSidebarLoaderProps) {
	const realEstate = await getRealEstateByUuid(uuid);
	const addressLine = `${realEstate?.address.street}, ${realEstate?.address.building}, ${realEstate?.address.city}`;

	return (
		<RealEstateSidebar
			typeLabel={REAL_ESTATE_TYPE_LABELS[realEstate?.type || 'house']}
			address={addressLine}
			area={realEstate?.area}
		/>
	);
}
