import { RealEstateSidebarLoader } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebarLoader';
import { PaymentsPage } from '@/components/widgets/finance/Page';

import {
	getPaymentsByRealEstate,
	getPaymentsSummaryByRealEstate
} from '@/domains/finance/api/api.server';
import type { Uuid } from '@/types/common';

interface IPaymentsLoaderProps {
	uuid: Uuid;
}

//todo Promise.allsettle
export async function PaymentsLoader({ uuid }: IPaymentsLoaderProps) {
	const paymentsResponse = await getPaymentsByRealEstate(uuid);
	const summaryResponse = await getPaymentsSummaryByRealEstate(uuid);

	const payments = paymentsResponse?.data.payments ?? [];
	const summary = summaryResponse?.data;

	return (
		<div className='flex gap-x-8 min-w-0'>
			<RealEstateSidebarLoader uuid={uuid} />
			<main className='flex-1 min-w-0'>
				<PaymentsPage payments={payments} summary={summary} />
			</main>
		</div>
	);
}
