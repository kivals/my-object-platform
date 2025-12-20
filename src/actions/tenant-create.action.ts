'use server';

import { createTenantToRealEstate } from '@/domains/tenants/api/api.server';
import type { TAttachTenantByRealEstateRequest } from '@/domains/tenants/api/schema';
import { handleActionError } from '@/lib/actions/handleActionError';

export const tenantCreateAction = async (
	_prevState: IActionState,
	payload: TAttachTenantByRealEstateRequest & { uuid: string }
): Promise<IActionState> => {
	if (!payload.uuid) {
		return { error: 'Ошибка. Не передан идентификатор объекта' };
	}
	try {
		await createTenantToRealEstate(payload.uuid, payload);
		return { success: true };
	} catch (error) {
		return handleActionError(
			error,
			'Ошибка добавления арендатора! Возможно арендатор уже привязан к объекту'
		);
	}
};
