import { AUTH_ENDPOINTS } from '@/domains/auth/endpoints/external';
import { apiFetch } from '@/lib/api/api-fetch.server';
import { handleRouteError, ok } from '@/lib/api/route-utils';
import { signOut } from '@/lib/auth';

export async function DELETE() {
	try {
		await apiFetch(AUTH_ENDPOINTS.LOGOUT, {
			method: 'DELETE'
		});

		await signOut();

		return ok();
	} catch (e) {
		console.error('[LOGOUT]', e);
		return handleRouteError(e, 'Logout failed');
	}
}
