import { Suspense } from 'react';

import { CourtCasesLoader } from '@/components/widgets/court-cases/CourtCasesLoader';

export default async function CourtCasesPage({ params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<h1> Loading </h1>}>
			<CourtCasesLoader uuid={uuid} />
		</Suspense>
	);
}
