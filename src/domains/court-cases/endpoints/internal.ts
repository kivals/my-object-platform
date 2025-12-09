import type { Uuid } from '@/types/common';

export const COURT_CASES_API_ROUTES = {
	GET_COURT_CASE_DETAIL: (realEstateUuid: Uuid, courtCaseUuid: Uuid) =>
		`/api/real-estate/${realEstateUuid}/court-cases/${courtCaseUuid}`
};
