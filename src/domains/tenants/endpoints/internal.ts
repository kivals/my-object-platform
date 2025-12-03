import type { Uuid } from '@/types/common';

export const TENANT_API_ROUTES = {
	DETACH_BY_REAL_ESTATE_UUID: (realEstateUuid: Uuid, tenantUuid: Uuid) =>
		`/api/real-estate/${realEstateUuid}/tenants/${tenantUuid}`
};
