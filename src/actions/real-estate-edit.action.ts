'use server';

import { redirect } from 'next/navigation';

import { editRealEstateByUuid } from '@/domains/real-estate/api/api.server';
import type { RealEstateUpdate } from '@/domains/real-estate/api/schema';
import { handleActionError } from '@/lib/actions/handleActionError';
import { ApiError } from '@/lib/api/api-error';
import { LOGIN_URL } from '@/routes';

export const realEstateEditAction = async (
	_prevState: IActionState,
	payload: RealEstateUpdate & { uuid: string }
): Promise<IActionState> => {
	if (!payload.uuid) {
		return { error: 'Ошибка. Не передан идентификатор объекта' };
	}

	try {
		await editRealEstateByUuid(payload.uuid, {
			name: payload.name,
			type: payload.type,
			manager: payload.manager,
			area: payload.area,
			rentalValue: payload.rentalValue,
			address: payload.address,
			description: payload.description
		});

		return { success: true };
	} catch (error) {
		if (error instanceof ApiError && error.status === 401) {
			redirect(LOGIN_URL);
		}
		return handleActionError(error, 'Ошибка обновления данных объекта. Попробуйте позже!');
	}
};
