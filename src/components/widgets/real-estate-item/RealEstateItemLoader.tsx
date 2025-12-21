import { notFound } from 'next/navigation';

import { RealEstateSidebarLoader } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebarLoader';
import { RealEstateItem } from '@/components/widgets/real-estate-item/RealEstateItem';

import { getRealEstateByUuid } from '@/domains/real-estate/api/api.server';
import { ApiError } from '@/lib/api/api-error';

interface IRealEstateItemContent {
	uuid: string;
}

export async function RealEstateItemLoader({ uuid }: IRealEstateItemContent) {
	try {
		const realEstate = await getRealEstateByUuid(uuid);

		return (
			<div className='flex gap-x-8 min-w-0'>
				<RealEstateSidebarLoader uuid={uuid} />
				<main className='flex-1 min-w-0'>{realEstate && <RealEstateItem data={realEstate} />}</main>
			</div>
		);
	} catch (err) {
		if (err instanceof ApiError && err.status === 404) {
			notFound();
		}
		throw err;
	}
}
