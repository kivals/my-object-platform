import React, { type ReactNode, Suspense } from 'react';

import { RealEstateEditLoader } from '@/components/widgets/real-estate-edit/RealEstateEditLoader';
import { RealEstateEditSkeleton } from '@/components/widgets/real-estate-edit/RealEstateEditSkeleton';

export default async function RealEstateEditPage({
	params
}: {
	children: ReactNode;
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<RealEstateEditSkeleton />}>
			<RealEstateEditLoader uuid={uuid} />
		</Suspense>
	);
}
