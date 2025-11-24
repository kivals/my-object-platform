'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { editRealEstateByUuid } from '@/domains/real-estate/api/api.server';
import type { RealEstateUpdate } from '@/domains/real-estate/api/schema';

interface RealEstateEditState {
	error?: string;
	success?: boolean;
}

export const realEstateEditAction = async (
	_prevState: RealEstateEditState,
	payload: RealEstateUpdate & { uuid: string }
): Promise<RealEstateEditState> => {
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
		// https://github.com/nextauthjs/next-auth/discussions/9389
		if (isRedirectError(error)) throw error;

		return { error: 'Ошибка обновления данных объекта. Попробуйте позже!' };
	}
};
