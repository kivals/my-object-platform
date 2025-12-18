import { NextResponse } from 'next/server';

import { AUTH_ENDPOINTS } from '@/domains/auth/endpoints/external';
import { apiFetch } from '@/lib/api/api-fetch.server';
import { signOut } from '@/lib/auth';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';

export async function DELETE() {
	try {
		const tokens = await getAuthTokens();

		if (!tokens) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		await apiFetch(AUTH_ENDPOINTS.LOGOUT, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		await signOut();

		return NextResponse.json({ ok: true });
	} catch (e) {
		console.error('[LOGOUT]', e);
		return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
	}
}
