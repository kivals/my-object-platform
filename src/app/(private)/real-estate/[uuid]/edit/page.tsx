import React, { Suspense } from 'react';

import { RealEstateEditLoader } from '@/components/widgets/real-estate-edit/RealEstateEditLoader';
import { RealEstateEditSkeleton } from '@/components/widgets/real-estate-edit/RealEstateEditSkeleton';

export default async function RealEstateEditPage({
	params
}: {
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;
	return (
		<Suspense fallback={<RealEstateEditSkeleton />}>
			<RealEstateEditLoader uuid={uuid} />
		</Suspense>
	);
}
