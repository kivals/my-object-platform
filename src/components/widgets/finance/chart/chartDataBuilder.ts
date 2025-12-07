import { format, parseISO, startOfMonth, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';

import type { TPayment } from '@/domains/finance/api/schema';

type ChartPoint = {
	month: string;
	amount: number;
};

export function buildMonthlyPaymentsChartData(payments: TPayment[], monthsBack = 24): ChartPoint[] {
	const now = new Date();
	const baseMonth = startOfMonth(now);

	// Массив дат-начала-месяца за последние N месяцев (от старых к новым)
	const months: Date[] = [];
	for (let i = monthsBack - 1; i >= 0; i--) {
		months.push(subMonths(baseMonth, i));
	}

	const amountsByMonth = new Map<string, number>();
	for (const m of months) {
		const key = format(m, 'yyyy-MM');
		amountsByMonth.set(key, 0);
	}

	for (const p of payments) {
		const d = parseISO(p.paymentDate); // или new Date(p.paymentDate)
		if (Number.isNaN(d.getTime())) continue;

		const monthStart = startOfMonth(d);
		const key = format(monthStart, 'yyyy-MM');

		if (!amountsByMonth.has(key)) continue; // платеж вне последних N месяцев

		amountsByMonth.set(key, (amountsByMonth.get(key) ?? 0) + p.amount);
	}

	return months.map(m => {
		const key = format(m, 'yyyy-MM');
		const monthShort = format(m, 'LLL', { locale: ru }); // "янв.", "фев." и т.п.
		const label = `${monthShort.slice(0, 3)} (${format(m, 'yy')})`; // "янв (25)"

		return {
			month: label,
			amount: amountsByMonth.get(key) ?? 0
		};
	});
}
