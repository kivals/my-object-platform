import React, { type ReactNode, Suspense } from 'react';

import { RealEstateItemContent } from '@/components/widgets/real-estate-item/RealEstateItemContent';
import { RealEstateItemPageSkeleton } from '@/components/widgets/real-estate-item/RealEstateItemPageSkeleton';

export default async function RealEstateItemPage({
	params
}: {
	children: ReactNode;
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<RealEstateItemPageSkeleton />}>
			<RealEstateItemContent uuid={uuid} />
		</Suspense>
	);
}
