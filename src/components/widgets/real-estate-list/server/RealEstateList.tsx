import Link from 'next/link';

import { RealEstateCard } from '@/components/widgets/real-estate-list/server/RealEstateCard';

import { getRealEstateList } from '@/domains/real-estate/api/api.server';
import type { RealEstateType } from '@/domains/real-estate/schema';
import { REAL_ESTATE_URL } from '@/routes';

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
				<Link key={item.realEstateUuid} href={`${REAL_ESTATE_URL}/${item.realEstateUuid}`}>
					<RealEstateCard data={item} size='xs' />
				</Link>
			))}
		</ul>
	);
}
