import { DashboardSectionHeader } from '@/components/DashboardSectionHeader';
import { PaymentsChartWidget } from '@/components/widgets/finance/chart/ChartWidget';
import { PaymentsSummaryWidget } from '@/components/widgets/finance/summary/SummaryWidget';
import { PaymentsTableWidget } from '@/components/widgets/finance/table/TableWidget';

import type { TPayment, TPaymentsSummary } from '@/domains/finance/api/schema';

interface IPaymentsPageProps {
	payments: TPayment[];
	summary?: TPaymentsSummary;
}

export function PaymentsPage({ payments, summary }: IPaymentsPageProps) {
	return (
		<section className='flex flex-1 flex-col'>
			<DashboardSectionHeader title='Финансы' />
			<div className='flex flex-col gap-y-6'>
				{summary && <PaymentsSummaryWidget summary={summary} />}
				<PaymentsChartWidget payments={payments} />
				<PaymentsTableWidget payments={payments} />
			</div>
		</section>
	);
}
