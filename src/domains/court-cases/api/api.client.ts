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
