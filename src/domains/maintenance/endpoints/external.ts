import type { Uuid } from '@/types/common';

export const MAINTENANCE = {
	GET_ALL: `${process.env.SERVER_MAINTENANCE_URL}/tasks`,

	POST_TASK: `${process.env.SERVER_MAINTENANCE_URL}/tasks`,

	PATCH_TASK: (uuid: Uuid) => `${process.env.SERVER_MAINTENANCE_URL}/tasks/${uuid}`
};
