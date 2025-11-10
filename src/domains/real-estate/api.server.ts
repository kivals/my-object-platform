import { realEstateListSchema } from '@/domains/real-estate/schema';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';

export async function getRealEstateList() {
	try {
		const response = await apiFetchValidated(
			'/realEstateProperties',
			realEstateListSchema,
			{ method: 'GET' },
			process.env.SERVER_PROPERTIES_URL
		);
		return response.realEstateProperties;
	} catch (e) {
		console.error('[getRealEstateList]', e);
		return [];
	}
}
