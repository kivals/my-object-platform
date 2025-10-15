import { PropertyCard } from '@/components/landings/hero/PropertyCard';
import { propertyData } from '@/components/landings/hero/data';

async function mockFetchObjects(): Promise<string> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('Объекты');
		}, 2000);
	});
}

export async function ObjectsList() {
	const objects = await mockFetchObjects();

	return (
		<div>
			<h2 className='text-h2 font-medium mb-6'>{objects}</h2>
			<ul className='flex flex-col gap-y-4'>
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
		</div>
	);
}
