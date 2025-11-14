import Link from 'next/link';

import { RealEstateCard } from '@/components/widgets/real-estate-list/server/RealEstateCard';

import { getRealEstateList } from '@/domains/real-estate/api.server';
import type { RealEstateType } from '@/domains/real-estate/schema';

interface IRealEstateListProps {
	type: RealEstateType;
}

export async function RealEstateList({ type }: IRealEstateListProps) {
	const items = await getRealEstateList(type);

	if (items.length === 0) {
		return <h3 className='text-h3'>Объектов недвижимости нет</h3>;
	}

	return (
		<ul className='flex flex-col gap-y-4'>
			{items.map(item => (
				<Link key={item.realEstateUuid} href='/objects/mock-uuid'>
					<RealEstateCard data={item} size='xs' />
				</Link>
			))}
		</ul>
	);
}
