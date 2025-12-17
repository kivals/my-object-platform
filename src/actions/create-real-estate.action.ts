'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import type { TCreateRealEstateForm } from '@/components/widgets/real-estate-create/validate/create.schema';

import { createRealEstate } from '@/domains/real-estate/api/api.server';
import type { TRealEstateCreateResponse } from '@/domains/real-estate/api/schema';

interface CreateRealEstateState {
	error?: string;
	success?: boolean;
	payload?: TRealEstateCreateResponse['data'];
}

export const createRealEstateAction = async (
	_: CreateRealEstateState,
	payload: TCreateRealEstateForm
): Promise<CreateRealEstateState> => {
	try {
		const { data } = await createRealEstate({ ...payload });

		return { success: true, payload: data };
	} catch (error) {
		// https://github.com/nextauthjs/next-auth/discussions/9389
		if (isRedirectError(error)) throw error;

		return { error: 'Ошибка создания судебного дела. Попробуйте позже!' };
	}
};
