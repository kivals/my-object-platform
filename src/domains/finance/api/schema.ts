import { z } from 'zod';

export const paymentStateSchema = z.enum(['paid', 'waiting', 'overdue']);

export const paymentSchema = z.object({
	paymentId: z.uuid(),
	amount: z.number(),
	state: paymentStateSchema,
	paymentDate: z.string()
});

export const paymentsResponseSchema = z.object({
	data: z.object({
		payments: z.array(paymentSchema)
	})
});

export const paymentsSummarySchema = z.object({
	countOverduePayments: z.number(),
	nextPaymentDate: z.string().nullable(),
	nextPaymentAmount: z.number().nullable()
});

export const paymentsSummaryResponseSchema = z.object({
	data: paymentsSummarySchema
});

export type TPaymentState = z.infer<typeof paymentStateSchema>;
export type TPayment = z.infer<typeof paymentSchema>;
export type TPaymentsResponse = z.infer<typeof paymentsResponseSchema>;
export type TPaymentsSummaryResponse = z.infer<typeof paymentsSummaryResponseSchema>;
export type TPaymentsSummary = z.infer<typeof paymentsSummarySchema>;
