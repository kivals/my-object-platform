import { Suspense } from 'react';

import { PaymentsLoader } from '@/components/widgets/finance/PaymentsLoader';

export default async function FinancePage({ params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<h1>Loading</h1>}>
			<PaymentsLoader uuid={uuid} />
		</Suspense>
	);
}
