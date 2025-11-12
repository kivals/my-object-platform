import { unstable_rethrow } from 'next/navigation';

import { REAL_ESTATE_ENDPOINTS } from '@/domains/real-estate/endpoints';
import { realEstateListSchema } from '@/domains/real-estate/schema';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';

export async function getRealEstateList() {
	try {
		const { data } = await apiFetchValidated(REAL_ESTATE_ENDPOINTS.GET_ALL, realEstateListSchema, {
			method: 'GET',
			query: {
				type: 'house'
			}
		});
		return data.realEstateProperties;
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getRealEstateList]', e);
		return [];
	}
}
