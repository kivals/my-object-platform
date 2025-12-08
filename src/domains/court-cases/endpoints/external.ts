import type { Uuid } from '@/types/common';

export const COURT_CASES = {
	GET_COURT_CASES_BY_REAL_ESTATE_UUID: (uuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/court-cases`
};
