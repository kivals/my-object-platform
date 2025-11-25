import { NextResponse } from 'next/server';

import { AUTH_ENDPOINTS } from '@/domains/auth/endpoints';
import { signOut } from '@/lib/auth';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';

export async function DELETE() {
	try {
		const tokens = await getAuthTokens();

		if (!tokens) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const res = await fetch(AUTH_ENDPOINTS.LOGOUT, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		if (!res.ok) {
			const errText = await res.text();
			return NextResponse.json({ error: errText }, { status: res.status });
		}

		await signOut();

		return NextResponse.json({ ok: true });
	} catch (e) {
		console.error('[LOGOUT]', e);
		return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
	}
}
