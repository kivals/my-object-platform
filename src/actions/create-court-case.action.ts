'use server';

import { createCourtCaseByUuid } from '@/domains/court-cases/api/api.server';
import type { TCreateCourtCaseBody } from '@/domains/court-cases/api/schema';
import { handleActionError } from '@/lib/actions/handleActionError';

export const createCourtCaseAction = async (
	_: IActionState,
	payload: TCreateCourtCaseBody & { uuid: string }
): Promise<IActionState> => {
	if (!payload.uuid) {
		return { error: 'Ошибка. Не передан идентификатор объекта' };
	}

	try {
		await createCourtCaseByUuid(payload.uuid, {
			courtCase: {
				...payload.courtCase
			},
			caseParties: [...payload.caseParties]
		});

		return { success: true };
	} catch (error) {
		return handleActionError(error, 'Ошибка создания судебного дела. Попробуйте позже!');
	}
};
