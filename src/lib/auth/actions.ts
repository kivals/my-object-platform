import type { BackendJWT } from '@/lib/auth/types';

export async function loginOnPython(email: string, password: string): Promise<BackendJWT | null> {
	const res = await fetch(`${process.env.SERVER_AUTH_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	});

	if (!res.ok) return null;
	return res.json();
}

export async function refreshOnPython(refreshToken: string): Promise<BackendJWT | null> {
	const res = await fetch(`${process.env.SERVER_AUTH_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${refreshToken}`
		},
		cache: 'no-store'
	});

	if (!res.ok) {
		console.error('[refreshOnPython] Refresh failed', res.status);
		return null;
	}

	return res.json();
}
