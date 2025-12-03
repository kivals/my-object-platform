'use server';

import type { TCreateTenant } from '@/domains/tenants/validate/create-form.schema';

interface ITenantCreateState {
	error?: string;
	success?: boolean;
}

export const tenantCreateAction = async (
	_prevState: ITenantCreateState,
	payload: TCreateTenant
): Promise<ITenantCreateState> => {
	console.log(payload);
	return { success: true };
};
