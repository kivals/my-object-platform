'use server';

import { editDocumentByUuid } from '@/domains/documents/api/api.server';
import type { DocumentEditByRealEstateBodyRequest } from '@/domains/documents/api/schema';
import { handleActionError } from '@/lib/actions/handleActionError';
import type { Uuid } from '@/types/common';

export const documentEditAction = async (
	_prevState: IActionState,
	payload: DocumentEditByRealEstateBodyRequest & { uuid: Uuid; documentUuid: Uuid }
): Promise<IActionState> => {
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
		return handleActionError(error, 'Ошибка обновления документа. Попробуйте позже!');
	}
};
