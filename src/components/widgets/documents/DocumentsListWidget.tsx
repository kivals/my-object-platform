import { DocumentsHeader } from '@/components/widgets/documents/DocumentsHeader';

import type { DocumentsByRealEstateData } from '@/domains/documents/api/schema';

interface IDocumentsListWidgetProps {
	data: DocumentsByRealEstateData;
}

export function DocumentsListWidget({ data }: IDocumentsListWidgetProps) {
	//const isTenantsExists = data.inactiveTenants.length > 0 || data.activeTenants.length > 0;
	console.log(data);
	return (
		<section className='flex flex-1 flex-col'>
			<DocumentsHeader />
			{/*<div className={cn('flex-1 flex items-start', !isTenantsExists && 'items-center')}>
				{isTenantsExists ? (
					<TenantsList data={data} />
				) : (
					<h2 className='flex-1 text-center text-primary font-semibold text-h2'>
						Арендаторы пока не добавлены
					</h2>
				)}
			</div>*/}
		</section>
	);
}
