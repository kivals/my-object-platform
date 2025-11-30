import type { DocumentsType } from '@/domains/documents/api/schema';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';

export const REAL_ESTATE_ENDPOINTS = {
	GET_ALL: `${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties`,

	GET_BY_UUID: (uuid: string) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}`,

	PUT_BY_UUID: (uuid: string) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}`,

	POST_FILE: (uuid: string, fileType: RealEstateDocumentsType, documentType?: DocumentsType) => {
		const endpoint = `${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/files?type=${fileType}`;
		return documentType ? `${endpoint}&documentType=${documentType}` : endpoint;
	},

	DELETE_FILE: (realEstateUuid: string, fileUuid: string, type: RealEstateDocumentsType) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${realEstateUuid}/files/${fileUuid}?type=${type}`
};
