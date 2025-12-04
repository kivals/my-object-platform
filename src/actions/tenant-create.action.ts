'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { createTenantToRealEstate } from '@/domains/tenants/api/api.server';
import type { TAttachTenantByRealEstateRequest } from '@/domains/tenants/api/schema';

interface ITenantCreateState {
	error?: string;
	success?: boolean;
}

export const tenantCreateAction = async (
	_prevState: ITenantCreateState,
	payload: TAttachTenantByRealEstateRequest & { uuid: string }
): Promise<ITenantCreateState> => {
	try {
		await createTenantToRealEstate(payload.uuid, payload);
		return { success: true };
	} catch (error) {
		// https://github.com/nextauthjs/next-auth/discussions/9389
		if (isRedirectError(error)) throw error;
		return { error: 'Ошибка добавления арендатора! Возможно арендатор уже привязан к объекту' };
	}
};
