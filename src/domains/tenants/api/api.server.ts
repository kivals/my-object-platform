import { unstable_rethrow } from 'next/navigation';

import {
	type TAttachTenantByRealEstateRequest,
	type TenantByRealEstateResponse,
	tenantsByRealEstateResponseSchema
} from '@/domains/tenants/api/schema';
import { TENANTS_ENDPOINTS } from '@/domains/tenants/endpoints/external';
import { apiFetch, apiFetchValidated } from '@/lib/api/api-fetch.server';
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
		console.error('[getTenants real-estate]', e);
		return null;
	}
}

export async function createTenantToRealEstate(
	realEstateUuid: Uuid,
	sendData: TAttachTenantByRealEstateRequest
) {
	if (!realEstateUuid) throw new Error('Не определен realEstateUuid');

	try {
		await apiFetch(TENANTS_ENDPOINTS.POST_ATTACH_TENANT_BY_REAL_ESTATE_UUID(realEstateUuid), {
			method: 'POST',
			body: JSON.stringify(sendData)
		});
	} catch (e) {
		unstable_rethrow(e);
		console.error('[createTenantToRealEstate]', e);
		throw e;
	}
}
