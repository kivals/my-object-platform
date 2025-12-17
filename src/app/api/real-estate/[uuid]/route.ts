import { NextRequest, NextResponse } from 'next/server';

import { REAL_ESTATE_ENDPOINTS } from '@/domains/real-estate/endpoints/external';
import { apiFetch } from '@/lib/api/api-fetch.server';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';

//todo проверить работу когда протухнет access token
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ uuid: string }> }) {
	try {
		const { uuid } = await params;

		const tokens = await getAuthTokens();
		const endpoint = REAL_ESTATE_ENDPOINTS.DELETE_REAL_ESTATE(uuid);

		if (!tokens) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		await apiFetch(endpoint, {
			method: 'DELETE'
		});

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('[DELETE REAL ESTATE ERROR]', err);
		return NextResponse.json({ error: 'DELETE real estate failed' }, { status: 500 });
	}
}
