'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { createCourtCaseByUuid } from '@/domains/court-cases/api/api.server';
import type { TCreateCourtCaseBody } from '@/domains/court-cases/api/schema';

interface CreateCourtCaseState {
	error?: string;
	success?: boolean;
}

export const createCourtCaseAction = async (
	_: CreateCourtCaseState,
	payload: TCreateCourtCaseBody & { uuid: string }
): Promise<CreateCourtCaseState> => {
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
		// https://github.com/nextauthjs/next-auth/discussions/9389
		if (isRedirectError(error)) throw error;

		return { error: 'Ошибка создания судебного дела. Попробуйте позже!' };
	}
};
