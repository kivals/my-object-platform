import type { Uuid } from '@/types/common';

export const MAINTENANCE_API_ROUTES = {
	PATCH_TASK: (taskUid: Uuid) => `/api/maintenance/tasks/${taskUid}`
};
