import { RealEstateSidebarLoader } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebarLoader';
import { DocumentsListWidget } from '@/components/widgets/documents/ListWidget';

import { getDocumentsByRealEstate } from '@/domains/documents/api/api.server';
import type { Uuid } from '@/types/common';

interface IDocumentsByRealEstateLoaderProps {
	uuid: Uuid;
}

export async function DocumentsLoader({ uuid }: IDocumentsByRealEstateLoaderProps) {
	const documents = await getDocumentsByRealEstate(uuid);

	return (
		<div className='flex gap-x-8 min-w-0'>
			<RealEstateSidebarLoader uuid={uuid} />
			<main className='flex-1 flex flex-col min-w-0'>
				{documents && <DocumentsListWidget data={documents.data} />}
			</main>
		</div>
	);
}
