import type { RealEstateDocumentsType } from '@/domains/real-estate/types';

export const REAL_ESTATE_ENDPOINTS = {
	GET_ALL: `${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties`,

	GET_BY_UUID: (uuid: string) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}`,

	POST_FILE: (uuid: string, type: RealEstateDocumentsType) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/files?type=${type}`,

	DELETE_FILE: (realEstateUuid: string, fileUuid: string, type: RealEstateDocumentsType) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${realEstateUuid}/files/${fileUuid}?type=${type}`
};
