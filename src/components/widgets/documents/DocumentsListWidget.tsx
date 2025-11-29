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
			<div className='flex flex-col gap-y-5'>
				<DocumentsGroup
					docs={contracts}
					title={DocumentsStatusLabels.contracts}
					buttonLabel='Новый договор'
					uploadLabel='Добавить договор'
					type='contracts'
				/>
				<DocumentsGroup
					docs={invoices}
					title={DocumentsStatusLabels.invoices}
					buttonLabel='Новый cчет'
					uploadLabel='Добавить cчет'
					type='invoices'
				/>
				<DocumentsGroup
					docs={acts}
					title={DocumentsStatusLabels.acts}
					buttonLabel='Новый акт'
					uploadLabel='Добавить акт'
					type='acts'
				/>
			</div>
		</section>
	);
}
