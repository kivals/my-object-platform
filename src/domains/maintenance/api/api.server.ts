import { unstable_rethrow } from 'next/navigation';

import {
	type TMaintenanceTasksResponse,
	maintenanceTasksResponseSchema
} from '@/domains/maintenance/api/schema';
import { MAINTENANCE } from '@/domains/maintenance/endpoints/external';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';

export async function getAllTasks(): Promise<TMaintenanceTasksResponse | null> {
	try {
		return await apiFetchValidated(MAINTENANCE.GET_ALL, maintenanceTasksResponseSchema, {
			method: 'GET'
		});
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getRealEstateItem]', e);
		return null;
	}
}
