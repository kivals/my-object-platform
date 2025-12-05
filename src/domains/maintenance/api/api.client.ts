import type { TMaintenanceStatus } from '@/domains/maintenance/api/schema';
import { MAINTENANCE_API_ROUTES } from '@/domains/maintenance/endpoints/internal';
import type { Uuid } from '@/types/common';

export async function changeTaskStatus(taskUuid: Uuid, status: TMaintenanceStatus) {
	const res = await fetch(MAINTENANCE_API_ROUTES.PATCH_TASK(taskUuid), {
		method: 'PATCH',
		body: JSON.stringify({ status }),
		cache: 'no-cache'
	});

	if (!res.ok) {
		throw new Error(await res.text());
	}

	return true;
}
