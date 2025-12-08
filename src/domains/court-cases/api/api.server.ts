import { unstable_rethrow } from 'next/navigation';

import {
	type TCourtCasesResponse,
	courtCasesResponseSchema
} from '@/domains/court-cases/api/schema';
import { COURT_CASES } from '@/domains/court-cases/endpoints/external';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';
import type { Uuid } from '@/types/common';

export async function getCourtCasesByRealEstate(uuid: Uuid): Promise<TCourtCasesResponse | null> {
	try {
		return await apiFetchValidated(
			COURT_CASES.GET_COURT_CASES_BY_REAL_ESTATE_UUID(uuid),
			courtCasesResponseSchema,
			{
				method: 'GET'
			}
		);
	} catch (e) {
		unstable_rethrow(e);
		console.error('[get court case by real-estate]', e);
		return null;
	}
}
