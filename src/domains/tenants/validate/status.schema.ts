import { z } from 'zod';

export const tenantStatusSchema = z.enum([
	'natural_person',
	'sole_proprietor',
	'self-employed',
	'limited_liability_company',
	'public_joint-stock_company',
	'non-public_joint-stock_company'
]);

export type TenantStatus = z.infer<typeof tenantStatusSchema>;
