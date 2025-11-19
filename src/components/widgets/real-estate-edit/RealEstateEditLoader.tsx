import { RealEstateEdit } from '@/components/widgets/real-estate-edit/RealEstateEdit';

import { getRealEstateByUuid } from '@/domains/real-estate/api.server';

interface IRealEstateEditLoader {
	uuid: string;
}

export async function RealEstateEditLoader({ uuid }: IRealEstateEditLoader) {
	const realEstate = await getRealEstateByUuid(uuid);

	if (!realEstate) return null;

	return <RealEstateEdit data={realEstate} />;
}
