import Link from 'next/link';

import { PropertyCard } from '@/components/landings/hero/PropertyCard';
import { propertyData } from '@/components/landings/hero/data';

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
			<li>
				<Link href='/objects/mock-uuid'>
					<PropertyCard
						status={propertyData.status}
						imageUrl={propertyData.imageUrl}
						address={propertyData.address}
						area={propertyData.area}
						nextPayment={propertyData.nextPayment}
						income={propertyData.income}
						size='xs'
					/>
				</Link>
			</li>
			<li>
				<PropertyCard
					status={propertyData.status}
					imageUrl={propertyData.imageUrl}
					address={propertyData.address}
					area={propertyData.area}
					nextPayment={propertyData.nextPayment}
					income={propertyData.income}
					size='xs'
				/>
			</li>
			<li>
				<PropertyCard
					status={propertyData.status}
					imageUrl={propertyData.imageUrl}
					address={propertyData.address}
					area={propertyData.area}
					nextPayment={propertyData.nextPayment}
					income={propertyData.income}
					size='xs'
				/>
			</li>
			<li>
				<PropertyCard
					status={propertyData.status}
					imageUrl={propertyData.imageUrl}
					address={propertyData.address}
					area={propertyData.area}
					nextPayment={propertyData.nextPayment}
					income={propertyData.income}
					size='xs'
				/>
			</li>
		</ul>
	);
}
