import { z } from 'zod';

export const maintenanceStatusSchema = z.enum(['open', 'in_progress', 'ready']);

export const maintenanceItemSchema = z.object({
	authorId: z.uuid(),
	realEstateId: z.uuid(),
	operatorId: z.uuid(),
	title: z.string(),
	description: z.string(),
	deadline: z.iso.datetime(),
	status: maintenanceStatusSchema,
	priority: z.union([z.literal(1), z.literal(2), z.literal(3)]),
	id: z.uuid()
});

export const maintenanceTasksResponseSchema = z.object({
	data: z.object({
		tasks: z.array(maintenanceItemSchema)
	})
});

export type TMaintenanceTasksResponse = z.infer<typeof maintenanceTasksResponseSchema>;
export type TMaintenanceStatus = z.infer<typeof maintenanceStatusSchema>;
export type TMaintenanceItem = z.infer<typeof maintenanceItemSchema>;
export type TMaintenancePriority = z.infer<typeof maintenanceItemSchema>['priority'];
