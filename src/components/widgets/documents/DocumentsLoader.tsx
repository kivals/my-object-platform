import { notFound } from 'next/navigation';

import { RealEstateSidebarLoader } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebarLoader';
import { DocumentsListWidget } from '@/components/widgets/documents/ListWidget';

import { getDocumentsByRealEstate } from '@/domains/documents/api/api.server';
import { ApiError } from '@/lib/api/api-error';
import type { Uuid } from '@/types/common';

interface IDocumentsByRealEstateLoaderProps {
	uuid: Uuid;
}

export async function DocumentsLoader({ uuid }: IDocumentsByRealEstateLoaderProps) {
	try {
		const documents = await getDocumentsByRealEstate(uuid);

		return (
			<div className='flex gap-x-8 min-w-0'>
				<RealEstateSidebarLoader uuid={uuid} />
				<main className='flex-1 flex flex-col min-w-0'>
					{documents && <DocumentsListWidget data={documents.data} />}
				</main>
			</div>
		);
	} catch (err) {
		if (err instanceof ApiError && err.status === 404) {
			notFound();
		}
		throw err;
	}
}
