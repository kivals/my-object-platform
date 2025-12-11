import { z } from 'zod';

import { courtCaseStatusSchema } from '@/domains/court-cases/api/schema';

export const casePartySchema = z.object({
	role: z.enum(['applicant', 'respondent']),
	fio: z.string().min(5, 'Минимум 5 символов').max(50, 'Максимум 50 символов')
});

export const courtCaseSchema = z.object({
	name: z.string().min(10, 'Минимум 10 символов').max(70, 'Максимум 70 символов'),

	instance: z.string().min(3, 'Минимум 3 символа').max(50, 'Максимум 50 символов'),

	nextHearingDate: z.string().optional(),

	status: courtCaseStatusSchema,

	judgeFio: z.string().min(5, 'Минимум 5 символов').max(50, 'Максимум 50 символов'),

	email: z.email('Некорректный email'),

	phone: z.string().min(1, 'Поле обязательно').max(16, 'Максимум 16 символов')
});

export const createCourtCaseSchema = z.object({
	caseParties: z.array(casePartySchema).min(2, 'Минимум 2 стороны'),

	courtCase: courtCaseSchema
});

export type TFormCreateCourtCase = z.infer<typeof createCourtCaseSchema>;
