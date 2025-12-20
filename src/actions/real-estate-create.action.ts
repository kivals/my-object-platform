'use server';

import { redirect } from 'next/navigation';

import type { TCreateRealEstateForm } from '@/components/widgets/real-estate-create/validate/create.schema';

import { createRealEstate } from '@/domains/real-estate/api/api.server';
import type { TRealEstateCreateResponse } from '@/domains/real-estate/api/schema';
import { handleActionError } from '@/lib/actions/handleActionError';
import { ApiError } from '@/lib/api/api-error';
import { LOGIN_URL } from '@/routes';

export const realEstateCreateAction = async (
	_: IActionState<TRealEstateCreateResponse['data']>,
	payload: TCreateRealEstateForm
): Promise<IActionState<TRealEstateCreateResponse['data']>> => {
	try {
		const { data } = await createRealEstate({ ...payload });

		return { success: true, payload: data };
	} catch (error) {
		if (error instanceof ApiError && error.status === 401) {
			redirect(LOGIN_URL);
		}
		return handleActionError(error, 'Ошибка создания судебного дела. Попробуйте позже!');
	}
};
