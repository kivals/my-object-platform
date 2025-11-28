import { DocumentsGroup } from '@/components/widgets/documents/DocumentsGroup';
import { DocumentsHeader } from '@/components/widgets/documents/DocumentsHeader';

import type { DocumentsByRealEstateData, DocumentsType } from '@/domains/documents/api/schema';

interface IDocumentsListWidgetProps {
	data: DocumentsByRealEstateData;
}

const DocumentsStatusLabels: Record<DocumentsType, string> = {
	contracts: 'Договора',
	invoices: 'Счета',
	acts: 'Акты'
};

export function DocumentsListWidget({ data }: IDocumentsListWidgetProps) {
	const { acts, contracts, invoices } = data;

	return (
		<section className='flex flex-1 flex-col'>
			<DocumentsHeader />
			<div className="flex flex-col gap-y-5">
				<DocumentsGroup
					docs={contracts}
					title={DocumentsStatusLabels.contracts}
					newLabel='Новый договор'
				/>
				<DocumentsGroup
					docs={invoices}
					title={DocumentsStatusLabels.invoices}
					newLabel='Новый cчет'
				/>
				<DocumentsGroup docs={acts} title={DocumentsStatusLabels.acts} newLabel='Новый акт' />
			</div>
		</section>
	);
}
