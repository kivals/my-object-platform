import type { DocumentsType } from '@/domains/documents/api/schema';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import type { Uuid } from '@/types/common';

export const COURT_CASES_API_ROUTES = {
	GET_COURT_CASE_DETAIL: (realEstateUuid: Uuid, courtCaseUuid: Uuid) =>
		`/api/real-estate/${realEstateUuid}/court-cases/${courtCaseUuid}`,

	UPLOAD_DOCUMENT: (
		realEstateUuid: Uuid,
		fileType: RealEstateDocumentsType,
		docType: DocumentsType,
		courtCaseId: Uuid
	) =>
		`/api/real-estate/${realEstateUuid}/files?type=${fileType}&documentType=${docType}&courtCaseId=${courtCaseId}`
};
