import { unstable_rethrow } from 'next/navigation';

import {
	type RealEstate,
	type RealEstateType,
	realEstateItemSchema,
	realEstateListSchema
} from '@/domains/real-estate/api/schema';
import { REAL_ESTATE_ENDPOINTS } from '@/domains/real-estate/endpoints/external';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';

/**
 * Запрашивает список объектов недвижимости.
 * @param type Тип недвижимости.
 * @returns Массив объектов недвижимости, прошедших валидацию схемой.
 */
export async function getRealEstateList(type: RealEstateType): Promise<RealEstate[]> {
	try {
		const { data } = await apiFetchValidated(REAL_ESTATE_ENDPOINTS.GET_ALL, realEstateListSchema, {
			method: 'GET',
			query: {
				type
			}
		});
		return data.realEstateProperties;
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getRealEstateList]', e);
		return [];
	}
}

/**
 * Запрашивает объект недвижимости по uuid.
 * @param uuid Идентификатор недвижимости.
 * @returns Массив объектов недвижимости, прошедших валидацию схемой.
 */
export async function getRealEstateByUuid(uuid: string): Promise<RealEstate | null> {
	if (!uuid) return null;

	try {
		const { data } = await apiFetchValidated(
			REAL_ESTATE_ENDPOINTS.GET_BY_UUID(uuid),
			realEstateItemSchema,
			{
				method: 'GET'
			}
		);

		return data;
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getRealEstateItem]', e);
		return null;
	}
}
