import type { Uuid } from '@/types/common';

export const DOCUMENTS_ENDPOINTS = {
	GET_BY_REAL_ESTATE_UUID: (uuid: string) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/files/documents`,

	PATCH_DOCUMENT_BY_REAL_ESTATE_UUID: (realEstateUuid: Uuid, documentUuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${realEstateUuid}/files/documents/${documentUuid}`
};
