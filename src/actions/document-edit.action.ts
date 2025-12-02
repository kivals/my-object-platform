'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { editDocumentByUuid } from '@/domains/documents/api/api.server';
import type { DocumentEditByRealEstateBodyRequest } from '@/domains/documents/api/schema';
import type { Uuid } from '@/types/common';

interface DocumentEditState {
	error?: string;
	success?: boolean;
}

export const documentEditAction = async (
	_prevState: DocumentEditState,
	payload: DocumentEditByRealEstateBodyRequest & { uuid: Uuid; documentUuid: Uuid }
): Promise<DocumentEditState> => {
	if (!payload.uuid || !payload.documentUuid) {
		return { error: 'Ошибка. Не передан идентификатор' };
	}

	try {
		await editDocumentByUuid(payload.uuid, payload.documentUuid, {
			type: payload.type,
			isCompleted: payload.isCompleted
		});

		return { success: true };
	} catch (error) {
		// https://github.com/nextauthjs/next-auth/discussions/9389
		if (isRedirectError(error)) throw error;
		return { error: 'Ошибка обновления данных объекта. Попробуйте позже!' };
	}
};
