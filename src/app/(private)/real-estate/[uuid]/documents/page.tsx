import { Suspense } from 'react';

import { DocumentsByRealEstateLoader } from '@/components/widgets/documents/DocumentsByRealEstateLoader';

export default async function RealEstateItemPage({
	params
}: {
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<h1 className='text-h2'>LOADING </h1>}>
			<DocumentsByRealEstateLoader uuid={uuid} />
		</Suspense>
	);
}
