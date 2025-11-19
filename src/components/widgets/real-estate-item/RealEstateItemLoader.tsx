import React from 'react';

import { RealEstateSidebar } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebar';
import { RealEstateItem } from '@/components/widgets/real-estate-item/RealEstateItem';

import { getRealEstateByUuid } from '@/domains/real-estate/api.server';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';

interface IRealEstateItemContent {
	uuid: string;
}

export async function RealEstateItemLoader({ uuid }: IRealEstateItemContent) {
	const realEstate = await getRealEstateByUuid(uuid);
	const addressLine = `${realEstate?.address.street}, ${realEstate?.address.building}, ${realEstate?.address.city}`;

	return (
		<div className='flex gap-x-8'>
			<RealEstateSidebar
				typeLabel={REAL_ESTATE_TYPE_LABELS[realEstate?.type || 'house']}
				uuid={uuid}
				address={addressLine}
				area={realEstate?.area}
			/>
			<main className='flex-1'>{realEstate && <RealEstateItem data={realEstate} />}</main>
		</div>
	);
}
