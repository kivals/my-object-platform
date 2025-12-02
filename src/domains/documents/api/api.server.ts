import { unstable_rethrow } from 'next/navigation';

import {
	type DocumentsByRealEstateResponse,
	type DocumentsType,
	documentUpdateByRealEstateResponse,
	documentsByRealEstateResponseSchema
} from '@/domains/documents/api/schema';
import { DOCUMENTS_ENDPOINTS } from '@/domains/documents/endpoints/external';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';
import type { Uuid } from '@/types/common';

export async function getDocumentsByRealEstate(
	uuid: Uuid
): Promise<DocumentsByRealEstateResponse | null> {
	try {
		return await apiFetchValidated(
			DOCUMENTS_ENDPOINTS.GET_BY_REAL_ESTATE_UUID(uuid),
			documentsByRealEstateResponseSchema,
			{
				method: 'GET'
			}
		);
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getDocuments real-estate]', e);
		return null;
	}
}

export async function editDocumentByUuid(
	realEstateUuid: Uuid,
	documentUuid: Uuid,
	sendData: { type: DocumentsType; isCompleted: boolean }
) {
	if (!realEstateUuid || !documentUuid) return null;

	try {
		const { data } = await apiFetchValidated(
			DOCUMENTS_ENDPOINTS.PATCH_DOCUMENT_BY_REAL_ESTATE_UUID(realEstateUuid, documentUuid),
			documentUpdateByRealEstateResponse,
			{
				method: 'PATCH',
				body: JSON.stringify(sendData)
			}
		);

		return data;
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getRealEstateItem]', e);
		return null;
	}
}
