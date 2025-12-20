import { unstable_rethrow } from 'next/navigation';

import { type TTenantUsersResponse, tenantsUsersResponseSchema } from '@/domains/users/api/schema';
import { USERS_ENDPOINTS } from '@/domains/users/endpoints/external';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';

export async function getTenantUsers(name?: string): Promise<TTenantUsersResponse | null> {
	try {
		const endpoint = `${USERS_ENDPOINTS.GET_TENANT_USERS}?name=${name ?? ''}`;

		return apiFetchValidated(endpoint, tenantsUsersResponseSchema, {
			method: 'GET'
		});
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getTenants users real-estate]', e);
		throw e;
	}
}
