import { Suspense } from 'react';

import { FilterController } from '@/components/widgets/real-estate-list/client/FilterController';
import { RealEstateList } from '@/components/widgets/real-estate-list/server/RealEstateList';

import { SkeletonLoader } from '@/ui/SkeletonLoader';

import type { RealEstateType } from '@/domains/real-estate/schema';

interface IRealEstateListProps {
	type: RealEstateType;
}

export function RealEstateListWidget({ type = 'house' }: IRealEstateListProps) {
	return (
		<div>
			<div className='flex justify-between mb-2'>
				<h2 className='text-h2 font-medium self-center mb-4'>Объекты</h2>
				<FilterController currentType={type} />
			</div>

			<Suspense key={type} fallback={<SkeletonLoader count={5} className='h-72 rounded-[40px]' />}>
				<RealEstateList type={type} />
			</Suspense>
		</div>
	);
}
