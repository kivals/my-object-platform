import { NextRequest, NextResponse } from 'next/server';

import { REAL_ESTATE_ENDPOINTS } from '@/domains/real-estate/endpoints/external';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import { apiFetch } from '@/lib/api/api-fetch.server';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';

//todo проверить работу когда протухнет access token
export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string; fileUuid: string }> }
) {
	try {
		const { uuid, fileUuid } = await params;

		const type = req.nextUrl.searchParams.get('type') as RealEstateDocumentsType;

		const tokens = await getAuthTokens();
		const endpoint = REAL_ESTATE_ENDPOINTS.DELETE_FILE(uuid, fileUuid, type);

		if (!tokens) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		if (!type) return NextResponse.json({ error: 'Bad request' }, { status: 400 });

		await apiFetch(endpoint, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('[FILE DELETE ERROR]', err);
		return NextResponse.json({ error: 'DELETE failed' }, { status: 500 });
	}
}
