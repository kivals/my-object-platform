import { z } from 'zod';

import { createFormSchema } from '@/domains/tenants/validate/create-form.schema';
import { tenantStatusSchema } from '@/domains/tenants/validate/status.schema';

const tenantShortSchema = z.object({
	tenantId: z.uuid(),
	status: tenantStatusSchema,
	legalName: z.string().nullable(), // null в примере
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	middleName: z.string().optional()
});

const tenantSchema = z.object({
	isActive: z.boolean(),
	tenant: tenantShortSchema,
	requisitesInn: z.string()
});

export const tenantsByRealEstateDataSchema = z.object({
	activeTenants: z.array(tenantSchema),
	inactiveTenants: z.array(tenantSchema) // TODO структура та же, только isActive=false ? надо проверить
});

export const tenantsByRealEstateResponseSchema = z.object({
	data: tenantsByRealEstateDataSchema
});

export const attachTenantByRealEstateRequestSchema = createFormSchema.safeExtend({
	firstName: z.string(),
	lastName: z.string(),
	middleName: z.string().optional(),
	email: z.email(),
	phone: z.string().min(5)
});

// типы
export type TenantByRealEstateResponse = z.infer<typeof tenantsByRealEstateResponseSchema>;
export type TenantsByRealEstateData = z.infer<typeof tenantsByRealEstateDataSchema>;
export type TAttachTenantByRealEstateRequest = z.infer<
	typeof attachTenantByRealEstateRequestSchema
>;
