import { z } from 'zod';

export const tenantStatusSchema = z.enum([
	'natural_person', // физлицо
	'sole_proprietor', // ИП
	'self-employed', // самозанятый
	'limited_liability_company', // ООО
	'public_joint-stock_company', // ПАО
	'non-public_joint-stock_company' // АО (непубличное)
]);

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

// типы
export type TenantStatus = z.infer<typeof tenantStatusSchema>;
export type TenantByRealEstateResponse = z.infer<typeof tenantsByRealEstateResponseSchema>;
export type TenantsByRealEstateData = z.infer<typeof tenantsByRealEstateDataSchema>;
