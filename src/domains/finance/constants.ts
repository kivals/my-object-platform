import type { TPaymentState } from '@/domains/finance/api/schema';

export const PAYMENT_STATE_LABELS: Record<TPaymentState, string> = {
	paid: 'Оплачен',
	waiting: 'Предстоит',
	overdue: 'Просрочен'
} as const;
