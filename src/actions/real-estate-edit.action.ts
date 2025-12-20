'use server';

import { editRealEstateByUuid } from '@/domains/real-estate/api/api.server';
import type { RealEstateUpdate } from '@/domains/real-estate/api/schema';
import { handleActionError } from '@/lib/actions/handleActionError';

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
		return handleActionError(error, 'Ошибка обновления данных объекта. Попробуйте позже!');
	}
};
