import type { BackendJWT } from '@/lib/auth/types';
import { AUTH_ENDPOINTS } from '@/domains/auth/endpoints';

export async function authLogin(email: string, password: string): Promise<BackendJWT | null> {
	const res = await fetch(AUTH_ENDPOINTS.LOGIN, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	});

	if (!res.ok) return null;
	return res.json();
}

export async function authRefresh(refreshToken: string): Promise<BackendJWT | null> {
	const res = await fetch(AUTH_ENDPOINTS.REFRESH, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${refreshToken}`
		},
		cache: 'no-store'
	});

	if (!res.ok) {
		console.error('[authRefresh] Refresh failed', res.status);
		return null;
	}

	return res.json();
}
