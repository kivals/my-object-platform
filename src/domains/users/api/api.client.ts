import type { TTenantUser } from '@/domains/users/api/schema';
import { USERS_API_ROUTES } from '@/domains/users/endpoints/internal';

export async function getTenantUsers(search: string): Promise<TTenantUser[]> {
	try {
		const res = await fetch(
			`${USERS_API_ROUTES.GET_TENANT_USERS}?name=${encodeURIComponent(search)}`,
			{ method: 'GET', cache: 'no-cache' }
		);

		if (!res.ok) {
			const text = await res.text();
			throw new Error(text || 'Ошибка при поиске арендаторов');
		}

		return res.json();
	} catch (err) {
		console.error('[CLIENT getTenantUsers ERROR]', err);
		throw err;
	}
}
