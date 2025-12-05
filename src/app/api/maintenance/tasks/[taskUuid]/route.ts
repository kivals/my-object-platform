import { NextRequest, NextResponse } from 'next/server';

import type { TMaintenanceItem } from '@/domains/maintenance/api/schema';
import { MAINTENANCE } from '@/domains/maintenance/endpoints/external';
import { apiFetch } from '@/lib/api/api-fetch.server';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';

//todo проверить работу когда протухнет access token
export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ taskUuid: string }> }
) {
	try {
		const { taskUuid } = await params;
		const tokens = await getAuthTokens();

		if (!tokens || !taskUuid) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = (await req.json()) as Partial<TMaintenanceItem>;
		const endpoint = MAINTENANCE.PATCH_TASK(taskUuid);

		await apiFetch(endpoint, {
			method: 'PATCH',
			body: JSON.stringify(body)
		});

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error('[PATCH TASK ERROR]', err);
		return NextResponse.json({ error: 'Update task failed' }, { status: 500 });
	}
}
