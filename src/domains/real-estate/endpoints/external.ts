import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import type { Uuid } from '@/types/common';

export const REAL_ESTATE_ENDPOINTS = {
	GET_ALL: `${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties`,

	DELETE_REAL_ESTATE: (realEstateUuid: string) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${realEstateUuid}`,

	CREATE_REAL_ESTATE: `${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties`,

	GET_BY_UUID: (uuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}`,

	PUT_BY_UUID: (uuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}`,

	POST_PHOTO: (uuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/files?type=photos`,

	DELETE_FILE: (realEstateUuid: string, fileUuid: string, type: RealEstateDocumentsType) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${realEstateUuid}/files/${fileUuid}?type=${type}`
};
