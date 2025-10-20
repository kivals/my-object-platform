import { Suspense } from 'react';

import { ObjectsList } from '@/components/widgets/objects-list/ObjectsList';

import { SkeletonLoader } from '@/ui/SkeletonLoader';

export default function DashboardEntry() {
	return (
		<section>
			<Suspense fallback={<SkeletonLoader count={5} className='h-52 rounded-[40px]' />}>
				<ObjectsList />
			</Suspense>
		</section>
	);
}
