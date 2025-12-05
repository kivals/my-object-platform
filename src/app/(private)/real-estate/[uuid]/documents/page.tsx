import { Suspense } from 'react';

import { DocumentsLoader } from '@/components/widgets/documents/DocumentsLoader';

export default async function RealEstateItemPage({
	params
}: {
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<h1 className='text-h2'>LOADING </h1>}>
			<DocumentsLoader uuid={uuid} />
		</Suspense>
	);
}
