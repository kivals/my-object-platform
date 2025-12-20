import { NextRequest } from 'next/server';

import { patchTask } from '@/domains/maintenance/api/api.server';
import type { TMaintenanceItem } from '@/domains/maintenance/api/schema';
import { MAINTENANCE } from '@/domains/maintenance/endpoints/external';
import { apiFetch } from '@/lib/api/api-fetch.server';
import { badRequest, handleRouteError, ok } from '@/lib/api/route-utils';

//Смена статуса задачи
export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ taskUuid: string }> }
) {
	try {
		const { taskUuid } = await params;

		if (!taskUuid) {
			return badRequest();
		}

		const body = (await req.json()) as Partial<TMaintenanceItem>;
		const endpoint = MAINTENANCE.PATCH_TASK(taskUuid);

		await apiFetch(endpoint, {
			method: 'PATCH',
			body: JSON.stringify(body)
		});

		await patchTask(taskUuid, body);

		return ok();
	} catch (err) {
		return handleRouteError(err, 'Update task failed');
	}
}
