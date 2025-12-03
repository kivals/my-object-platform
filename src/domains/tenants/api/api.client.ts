import { TENANT_API_ROUTES } from '@/domains/tenants/endpoints/internal';
import type { Uuid } from '@/types/common';

export async function deleteTenant(realEstateUuid: Uuid, tenantUuid: Uuid) {
	const res = await fetch(
		TENANT_API_ROUTES.DETACH_BY_REAL_ESTATE_UUID(realEstateUuid, tenantUuid),
		{
			method: 'DELETE',
			cache: 'no-cache'
		}
	);

	if (!res.ok) {
		throw new Error(await res.text());
	}

	return true;
}
