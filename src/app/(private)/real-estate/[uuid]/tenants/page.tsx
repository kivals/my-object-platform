import { Suspense } from 'react';

import { TenantSkeletonList } from '@/components/widgets/tenants-list/TenantSkeletonList';
import { TenantsByRealEstateLoader } from '@/components/widgets/tenants-list/TenantsByRealEstateLoader';

export default async function RealEstateItemPage({
	params
}: {
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<TenantSkeletonList />}>
			<TenantsByRealEstateLoader uuid={uuid} />
		</Suspense>
	);
}
