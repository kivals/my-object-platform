import { notFound } from 'next/navigation';

import { RealEstateEdit } from '@/components/widgets/real-estate-edit/RealEstateEdit';

import { getRealEstateByUuid } from '@/domains/real-estate/api/api.server';
import { ApiError } from '@/lib/api/api-error';

interface IRealEstateEditLoader {
	uuid: string;
}

export async function RealEstateEditLoader({ uuid }: IRealEstateEditLoader) {
	try {
		const realEstate = await getRealEstateByUuid(uuid);

		if (!realEstate) return null;

		return <RealEstateEdit uuid={uuid} data={realEstate} />;
	} catch (err) {
		if (err instanceof ApiError && err.status === 404) {
			notFound();
		}
		throw err;
	}
}
