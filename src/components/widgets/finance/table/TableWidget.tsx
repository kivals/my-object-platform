import { columns } from '@/components/widgets/finance/table/Columns';
import { DataTable } from '@/components/widgets/finance/table/DataTable';

import type { TPayment } from '@/domains/finance/api/schema';

interface IPaymentsTableWidgetProps {
	payments: TPayment[];
}

export function PaymentsTableWidget({ payments }: IPaymentsTableWidgetProps) {
	return (
		<div>
			<h2 className='font-semibold text-h2 mb-3.5'>График платежей от арендатора</h2>
			<DataTable columns={columns} data={payments} />
		</div>
	);
}
