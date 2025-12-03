import { z } from 'zod';

import { tenantStatusSchema } from '@/domains/tenants/api/schema';

export const tenantRequisitesSchema = z.object({
	bankAccountNumber: z.string().regex(/^\d{20}$/, 'Номер счёта должен содержать 20 цифр'),

	bic: z.string().regex(/^\d{9}$/, 'БИК должен содержать 9 цифр'),

	beneficiaryBank: z.string().max(50, 'Название банка не должно превышать 50 символов'),

	correspondentAccount: z
		.string()
		.regex(/^\d{20}$/, 'Корреспондентский счёт должен содержать 20 цифр'),

	inn: z.string().regex(/^\d{10,12}$/, 'ИНН должен содержать от 10 до 12 цифр'),

	kpp: z
		.string()
		// либо пустая строка, либо ровно 9 цифр
		.regex(/^(\d{9}|)$/, 'КПП должен содержать 9 цифр или быть пустым')
});

export const createTenantSchema = z
	.object({
		firstName: z.string().min(1, 'Имя обязательно'),
		lastName: z.string().min(1, 'Фамилия обязательна'),
		middleName: z.string().min(1, 'Отчество обязательно'),
		email: z.email('Некорректный email'),
		phone: z.string().min(1, 'Телефон обязателен'),
		tenant: z.object({
			status: tenantStatusSchema,
			legal_name: z.string().max(255).nullable().optional()
		}),
		requisites: tenantRequisitesSchema
	})
	.superRefine((data, ctx) => {
		const status = data.tenant.status;

		const isCompany = [
			'limited_liability_company',
			'public_joint-stock_company',
			'non-public_joint-stock_company'
		].includes(status);

		if (isCompany && (!data.tenant.legal_name || data.tenant.legal_name.trim() === '')) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['tenant', 'legal_name'],
				message: 'Поле обязательно для юрлиц'
			});
		}
	});

export type TCreateTenant = z.infer<typeof createTenantSchema>;
