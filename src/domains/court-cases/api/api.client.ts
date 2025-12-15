import type { TCourtCaseDetailsResponse } from '@/domains/court-cases/api/schema';
import { COURT_CASES_API_ROUTES } from '@/domains/court-cases/endpoints/internal';
import type { Uuid } from '@/types/common';

export async function getCourtCaseDetails(
	realEstateUuid: Uuid,
	courtCaseUuid: Uuid
): Promise<TCourtCaseDetailsResponse> {
	try {
		const res = await fetch(
			`${COURT_CASES_API_ROUTES.GET_COURT_CASE_DETAIL(realEstateUuid, courtCaseUuid)}`,
			{ method: 'GET', cache: 'no-cache' }
		);

		if (!res.ok) {
			const text = await res.text();
			throw new Error(text || 'Ошибка при загрузке деталей судебного дела');
		}

		return res.json();
	} catch (err) {
		console.error('[COURT CASES getCourtCaseDetails ERROR]', err);
		throw err;
	}
}

export async function uploadDocument(realEstateUuid: Uuid, courtCaseId: Uuid, file: File) {
	const form = new FormData();
	form.append('files', file);

	const endpoint = COURT_CASES_API_ROUTES.UPLOAD_DOCUMENT(
		realEstateUuid,
		'documents',
		'court',
		courtCaseId
	);

	const res = await fetch(endpoint, {
		method: 'POST',
		body: form,
		cache: 'no-cache'
	});

	if (!res.ok) {
		throw new Error(await res.text());
	}

	return res.json();
}
