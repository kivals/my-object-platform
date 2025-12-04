import { NextRequest, NextResponse } from 'next/server';

import { TENANTS_ENDPOINTS } from '@/domains/tenants/endpoints/external';
import { apiFetch } from '@/lib/api/api-fetch.server';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';

//todo проверить работу когда протухнет access token
export async function DELETE(
	_: NextRequest,
	{ params }: { params: Promise<{ uuid: string; tenantUuid: string }> }
) {
	try {
		const { uuid, tenantUuid } = await params;

		const tokens = await getAuthTokens();
		const endpoint = TENANTS_ENDPOINTS.DETACH_TENANT_BY_REAL_ESTATE_UUID(uuid, tenantUuid);

		if (!tokens) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		await apiFetch(endpoint, {
			method: 'DELETE'
		});

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('[DELETE TENANT ERROR]', err);
		return NextResponse.json({ error: 'DELETE failed' }, { status: 500 });
	}
}
