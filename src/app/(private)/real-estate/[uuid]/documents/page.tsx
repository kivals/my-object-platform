import { Suspense } from 'react';

import { DocumentsLoader } from '@/components/widgets/documents/DocumentsLoader';
import { DocumentsPageSkeleton } from '@/components/widgets/documents/PageSkeleton';

export default async function RealEstateItemPage({
	params
}: {
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<DocumentsPageSkeleton />}>
			<DocumentsLoader uuid={uuid} />
		</Suspense>
	);
}
