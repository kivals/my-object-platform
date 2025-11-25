import React, { Suspense } from 'react';

import { RealEstateItemLoader } from '@/components/widgets/real-estate-item/RealEstateItemLoader';
import { RealEstateItemPageSkeleton } from '@/components/widgets/real-estate-item/RealEstateItemPageSkeleton';

export default async function RealEstateItemPage({
	params
}: {
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<RealEstateItemPageSkeleton />}>
			<RealEstateItemLoader uuid={uuid} />
		</Suspense>
	);
}
