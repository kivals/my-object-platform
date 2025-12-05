import { RealEstateSidebar } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebar';
import { DocumentsListWidget } from '@/components/widgets/documents/ListWidget';

import { getDocumentsByRealEstate } from '@/domains/documents/api/api.server';
import { getRealEstateByUuid } from '@/domains/real-estate/api/api.server';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import type { Uuid } from '@/types/common';

interface IDocumentsByRealEstateLoaderProps {
	uuid: Uuid;
}

export async function DocumentsLoader({ uuid }: IDocumentsByRealEstateLoaderProps) {
	const documents = await getDocumentsByRealEstate(uuid);

	//todo тоже самое делается и в RealEstateItemLoader. или в стор или вынести в компонент RealEstateSidebar
	const realEstate = await getRealEstateByUuid(uuid);
	const addressLine = `${realEstate?.address.street}, ${realEstate?.address.building}, ${realEstate?.address.city}`;

	return (
		<div className='flex gap-x-8 min-w-0'>
			<RealEstateSidebar
				typeLabel={REAL_ESTATE_TYPE_LABELS[realEstate?.type || 'house']}
				uuid={uuid}
				address={addressLine}
				area={realEstate?.area}
			/>
			<main className='flex-1 flex flex-col min-w-0'>
				{documents && <DocumentsListWidget data={documents.data} />}
			</main>
		</div>
	);
}
