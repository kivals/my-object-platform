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
		throw e;
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

export async function deleteTenantToRealEstate(
	realEstateUuid: Uuid,
	tenantUuid: Uuid
): Promise<undefined> {
	const endpoint = TENANTS_ENDPOINTS.DETACH_TENANT_BY_REAL_ESTATE_UUID(realEstateUuid, tenantUuid);

	try {
		await apiFetch(endpoint, {
			method: 'DELETE'
		});
	} catch (e) {
		unstable_rethrow(e);
		throw e;
	}
}
