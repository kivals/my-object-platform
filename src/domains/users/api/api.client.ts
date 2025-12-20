import type { TTenantUser, TTenantUsersResponse } from '@/domains/users/api/schema';
import { USERS_API_ROUTES } from '@/domains/users/endpoints/internal';
import { clientApiFetch } from '@/lib/api/client-api-fetch';

export async function getTenantUsers(search: string): Promise<TTenantUser[]> {
	const endpoint = `${USERS_API_ROUTES.GET_TENANT_USERS}?name=${encodeURIComponent(search)}`;

	return await clientApiFetch<TTenantUsersResponse>(endpoint, {
		method: 'GET'
	});
}
