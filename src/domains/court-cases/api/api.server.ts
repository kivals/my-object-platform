import { unstable_rethrow } from 'next/navigation';

import {
	type TCourtCaseDetailsResponse,
	type TCourtCaseUploadDocApiResponse,
	type TCourtCasesResponse,
	type TCreateCourtCaseBody,
	type TCreateCourtCaseResponse,
	courtCaseDetailsResponseSchema,
	courtCaseUploadDocResponseSchema,
	courtCasesResponseSchema
} from '@/domains/court-cases/api/schema';
import { COURT_CASES } from '@/domains/court-cases/endpoints/external';
import { apiFetch, apiFetchValidated } from '@/lib/api/api-fetch.server';
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
		throw e;
	}
}

export async function getCourtCaseDetailsByRealEstate(
	realEstateUuid: Uuid,
	courtCaseUuid: Uuid
): Promise<TCourtCaseDetailsResponse | null> {
	try {
		return await apiFetchValidated(
			COURT_CASES.GET_COURT_CASE_DETAIL_BY_REAL_ESTATE_UUID(realEstateUuid, courtCaseUuid),
			courtCaseDetailsResponseSchema,
			{
				method: 'GET'
			}
		);
	} catch (e) {
		unstable_rethrow(e);
		throw e;
	}
}

export async function createCourtCaseByUuid(
	uuid: string,
	sendData: TCreateCourtCaseBody
): Promise<TCreateCourtCaseResponse | null> {
	try {
		return await apiFetch(COURT_CASES.POST_CREATE_CASE_BY_REAL_ESTATE_UUID(uuid), {
			method: 'POST',
			body: JSON.stringify(sendData)
		});
	} catch (e) {
		unstable_rethrow(e);
		console.error('[createCourtCaseByUuid]', e);
		throw e;
	}
}

export async function attachDocument(
	realEstateUuid: Uuid,
	courtCaseUuid: Uuid,
	formData: FormData
): Promise<TCourtCaseUploadDocApiResponse> {
	const endpoint = COURT_CASES.POST_DOCUMENT(realEstateUuid, courtCaseUuid);
	try {
		return await apiFetchValidated(endpoint, courtCaseUploadDocResponseSchema, {
			method: 'POST',
			body: formData
		});
	} catch (e) {
		unstable_rethrow(e);
		console.error('[court case attachDocument]', e);
		throw e;
	}
}
