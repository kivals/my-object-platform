import { Suspense } from 'react';

import { RealEstateList } from '@/components/widgets/real-estate-list/RealEstateList';

import { SkeletonLoader } from '@/ui/SkeletonLoader';

export default function DashboardEntry() {
	return (
		<section>
			<Suspense fallback={<SkeletonLoader count={5} className='h-52 rounded-[40px]' />}>
				<RealEstateList />
			</Suspense>
		</section>
	);
}
