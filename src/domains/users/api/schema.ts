import { z } from 'zod';

export const tenantUsersSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	middleName: z.string(),
	email: z.email(),
	phone: z.string(),
	id: z.uuid()
});

export const tenantsUsersResponseSchema = z.array(tenantUsersSchema);

// типы
export type TTenantUser = z.infer<typeof tenantUsersSchema>;
export type TTenantUsersResponse = z.infer<typeof tenantsUsersResponseSchema>;
