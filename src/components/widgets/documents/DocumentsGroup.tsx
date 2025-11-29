import { DocumentItem } from '@/components/widgets/documents/DocumentItem';
import { UploadDocumentWizard } from '@/components/widgets/documents/upload/UploadDocumentWizard';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';

import type { DocumentsType, RealEstateDocument } from '@/domains/documents/api/schema';

interface IDocumentsGroupProps {
	title: string;
	buttonLabel: string;
	uploadLabel: string;
	docs: RealEstateDocument[];
	type: DocumentsType;
}

export function DocumentsGroup({
	title,
	uploadLabel,
	buttonLabel,
	docs,
	type
}: IDocumentsGroupProps) {
	const sortedDocs = docs.toSorted((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

	return (
		<div className='flex flex-col gap-y-3'>
			<div className='flex justify-between items-center'>
				<h2 className='font-bold text-h2'>{title}</h2>

				<UploadDocumentWizard type={type} title={uploadLabel}>
					<Button className='px-10' variant='muted'>
						<Icon icon='Plus' size={25} />
						<span className='text-h3'>{buttonLabel}</span>
					</Button>
				</UploadDocumentWizard>
			</div>
			<SectionCard classNames='px-5 py-6'>
				<div className='flex flex-wrap gap-3.5'>
					{docs.length > 0 ? (
						sortedDocs.map(({ name, isCompleted, documentUuid, url }) => (
							<DocumentItem key={documentUuid} name={name} url={url} isCompleted={isCompleted} />
						))
					) : (
						<h1>Данных нет</h1>
					)}
				</div>
			</SectionCard>
		</div>
	);
}
