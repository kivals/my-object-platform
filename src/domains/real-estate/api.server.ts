import { REAL_ESTATE_ENDPOINTS } from '@/domains/real-estate/endpoints';
import { realEstateListSchema } from '@/domains/real-estate/schema';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';

export async function getRealEstateList() {
	try {
		const response = await apiFetchValidated(REAL_ESTATE_ENDPOINTS.GET_ALL, realEstateListSchema, {
			method: 'GET'
		});
		return response.realEstateProperties;
	} catch (e) {
		console.error('[getRealEstateList]', e);
		return [];
	}
}
