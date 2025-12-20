import { unstable_rethrow } from 'next/navigation';

import {
	type TMaintenanceItem,
	type TMaintenanceTasksResponse,
	maintenanceTasksResponseSchema
} from '@/domains/maintenance/api/schema';
import { MAINTENANCE } from '@/domains/maintenance/endpoints/external';
import { apiFetch, apiFetchValidated } from '@/lib/api/api-fetch.server';
import type { Uuid } from '@/types/common';

export async function getAllTasks(): Promise<TMaintenanceTasksResponse | null> {
	try {
		return await apiFetchValidated(MAINTENANCE.GET_ALL, maintenanceTasksResponseSchema, {
			method: 'GET'
		});
	} catch (err) {
		unstable_rethrow(err);
		console.error('[getAllTasks]', err);
		throw err;
	}
}

export async function patchTask(taskUuid: Uuid, sendData: Partial<TMaintenanceItem>) {
	if (!taskUuid) return null;

	try {
		await apiFetch(MAINTENANCE.PATCH_TASK(taskUuid), {
			method: 'PATCH',
			body: JSON.stringify(sendData)
		});
	} catch (err) {
		unstable_rethrow(err);
		throw err;
	}
}
