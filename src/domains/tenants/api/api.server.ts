import { unstable_rethrow } from 'next/navigation';

import {
	type TenantByRealEstateResponse,
	tenantsByRealEstateResponseSchema
} from '@/domains/tenants/api/schema';
import { TENANTS_ENDPOINTS } from '@/domains/tenants/endpoints/external';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';
import type { Uuid } from '@/types/common';

export async function getTenantsByRealEstate(
	uuid: Uuid
): Promise<TenantByRealEstateResponse | null> {
	try {
		return await apiFetchValidated(
			TENANTS_ENDPOINTS.GET_BY_REAL_ESTATE_UUID(uuid),
			tenantsByRealEstateResponseSchema,
			{
				method: 'GET'
			}
		);
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getRealEstateList]', e);
		return null;
	}
}
