import type {
	TCourtCaseDetailsResponse,
	TCourtCaseUploadDocApiResponse,
	TCourtCaseUploadDocResponse
} from '@/domains/court-cases/api/schema';
import { COURT_CASES_API_ROUTES } from '@/domains/court-cases/endpoints/internal';
import { clientApiFetch } from '@/lib/api/client-api-fetch';
import type { Uuid } from '@/types/common';

export async function getCourtCaseDetails(
	realEstateUuid: Uuid,
	courtCaseUuid: Uuid
): Promise<TCourtCaseDetailsResponse['data']> {
	const res = await clientApiFetch<TCourtCaseDetailsResponse>(
		COURT_CASES_API_ROUTES.GET_COURT_CASE_DETAIL(realEstateUuid, courtCaseUuid),
		{
			method: 'GET'
		}
	);

	return res.data;
}

export async function uploadDocument(
	realEstateUuid: Uuid,
	courtCaseId: Uuid,
	file: File
): Promise<TCourtCaseUploadDocResponse> {
	const endpoint = COURT_CASES_API_ROUTES.UPLOAD_DOCUMENT(realEstateUuid, courtCaseId);
	const form = new FormData();

	form.append('files', file);

	const res = await clientApiFetch<TCourtCaseUploadDocApiResponse>(endpoint, {
		method: 'POST',
		body: form
	});

	return res.data;
}
