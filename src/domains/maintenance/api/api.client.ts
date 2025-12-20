import type { TMaintenanceStatus } from '@/domains/maintenance/api/schema';
import { MAINTENANCE_API_ROUTES } from '@/domains/maintenance/endpoints/internal';
import { clientApiFetch } from '@/lib/api/client-api-fetch';
import type { Uuid } from '@/types/common';

export async function changeTaskStatus(taskUuid: Uuid, status: TMaintenanceStatus) {
	await clientApiFetch(MAINTENANCE_API_ROUTES.PATCH_TASK(taskUuid), {
		method: 'PATCH',
		body: JSON.stringify({ status })
	});

	return true;
}
