import type { DocumentsType } from '@/domains/documents/api/schema';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import type { Uuid } from '@/types/common';

export const REAL_ESTATE_ENDPOINTS = {
	GET_ALL: `${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties`,

	GET_BY_UUID: (uuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}`,

	PUT_BY_UUID: (uuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}`,

	//todo много аргументов
	POST_FILE: (
		uuid: Uuid,
		fileType: RealEstateDocumentsType,
		documentType?: DocumentsType,
		tenantId?: Uuid,
		courtCaseId?: Uuid
	) => {
		let endpoint = `${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/files?type=${fileType}`;
		if (documentType) {
			endpoint += `&documentType=${documentType}`;
		}
		if (tenantId) {
			endpoint += `&tenantId=${tenantId}`;
		}
		if (courtCaseId) {
			endpoint += `&courtCaseId=${courtCaseId}`;
		}

		return endpoint;
	},

	DELETE_FILE: (realEstateUuid: string, fileUuid: string, type: RealEstateDocumentsType) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${realEstateUuid}/files/${fileUuid}?type=${type}`
};
