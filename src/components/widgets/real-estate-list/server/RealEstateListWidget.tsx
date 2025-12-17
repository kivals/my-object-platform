import Link from 'next/link';
import { Suspense } from 'react';

import { FilterController } from '@/components/widgets/real-estate-list/client/FilterController';
import { RealEstateList } from '@/components/widgets/real-estate-list/server/RealEstateList';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { SkeletonLoader } from '@/ui/SkeletonLoader';

import type { RealEstateType } from '@/domains/real-estate/api/schema';
import { REAL_ESTATE_URL } from '@/routes';

interface IRealEstateListProps {
	type: RealEstateType;
}

export function RealEstateListWidget({ type = 'house' }: IRealEstateListProps) {
	return (
		<div>
			<div className='flex items-center justify-between mb-2'>
				<div className='flex items-center gap-x-3.5'>
					<h2 className='text-h2 font-medium self-center'>Объекты</h2>
					<Button className='py-2 px-3' asChild>
						<Link href={`${REAL_ESTATE_URL}/create`}>
							<Icon icon='Plus' size={25} />
							Создать объект
						</Link>
					</Button>
				</div>

				<FilterController currentType={type} />
			</div>

			<Suspense key={type} fallback={<SkeletonLoader count={5} className='h-72 rounded-[40px]' />}>
				<RealEstateList type={type} />
			</Suspense>
		</div>
	);
}
