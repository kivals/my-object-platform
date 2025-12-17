import type { DocumentsType } from '@/domains/documents/api/schema';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import type { Uuid } from '@/types/common';

export const REAL_ESTATE_API_ROUTES = {
	UPLOAD_PHOTO: (realEstateUuid: Uuid, type: RealEstateDocumentsType) =>
		`/api/real-estate/${realEstateUuid}/files?type=${type}`,

	DELETE_FILE: (realEstateUuid: Uuid, fileUuid: Uuid, fileType: RealEstateDocumentsType) =>
		`/api/real-estate/${realEstateUuid}/files/${fileUuid}?type=${fileType}`,

	DELETE_REAL_ESTATE: (realEstateUuid: Uuid) => `/api/real-estate/${realEstateUuid}`,

	UPLOAD_DOCUMENT: (
		realEstateUuid: Uuid,
		fileType: RealEstateDocumentsType,
		docType: DocumentsType
	) => `/api/real-estate/${realEstateUuid}/files?type=${fileType}&documentType=${docType}`
};
