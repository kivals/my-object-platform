import Link from 'next/link';

import { PropertyCard } from '@/components/landings/hero/PropertyCard';
import { propertyData } from '@/components/landings/hero/data';

import { OptionGroup } from '@/ui/OptionGroup';

import { getRealEstateList } from '@/domains/real-estate/api.server';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';

//todo remove after realized backend
async function mockFetchObjects(): Promise<string> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('Объекты');
		}, 500);
	});
}

export async function RealEstateList() {
	const objects = await mockFetchObjects();
	const realEstateList = await getRealEstateList();

	return (
		<div>
			<div className='flex justify-between mb-2'>
				<h2 className='text-h2 font-medium self-center mb-4'>{objects}</h2>
				<OptionGroup
					classNames='self-end'
					options={REAL_ESTATE_TYPE_LABELS}
					initial='house'
					areaLabel='Тип недвижимости'
				/>
			</div>

			{realEstateList.length > 0 ? (
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
			) : (
				<h3 className='text-h3'>Объектов недвижимости нет</h3>
			)}
		</div>
	);
}
