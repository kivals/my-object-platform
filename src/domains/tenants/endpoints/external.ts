import type { Uuid } from '@/types/common';

export const TENANTS_ENDPOINTS = {
	GET_BY_REAL_ESTATE_UUID: (uuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/tenants`,

	POST_ATTACH_TENANT_BY_REAL_ESTATE_UUID: (uuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/tenants`,

	DETACH_TENANT_BY_REAL_ESTATE_UUID: (uuid: Uuid, tenantUuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/tenants/${tenantUuid}`
};
