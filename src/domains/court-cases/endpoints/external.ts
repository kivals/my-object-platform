import type { Uuid } from '@/types/common';

export const COURT_CASES = {
	GET_COURT_CASES_BY_REAL_ESTATE_UUID: (uuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/court-cases`,

	GET_COURT_CASE_DETAIL_BY_REAL_ESTATE_UUID: (uuid: Uuid, courtCaseUuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/court-cases/${courtCaseUuid}`,

	POST_CREATE_CASE_BY_REAL_ESTATE_UUID: (uuid: string) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/court-cases/`,

	POST_DOCUMENT: (uuid: Uuid, courtCaseUuid: Uuid) =>
		`${process.env.SERVER_REAL_ESTATE_URL}/real-estate-properties/${uuid}/files?type=documents&documentType=court&courtCaseId=${courtCaseUuid}`
};
