import type { ReactNode } from 'react';

import { FileCard } from '@/components/widgets/documents/FileCard';

import { cn } from '@/utils/cn';

import type { TCourtCaseDocument } from '@/domains/court-cases/api/schema';

interface IDocumentListProps {
	documents: TCourtCaseDocument[];
	uploadFileCard: ReactNode;
}

export function DocumentList({ documents, uploadFileCard }: IDocumentListProps) {
	return (
		<div>
			<h3 className='text-h3 font-semibold mb-3.5'>Связанные документы</h3>
			<div className='flex flex-wrap gap-3.5'>
				{documents.map(doc => {
					const isCourtCaseDoc = doc.type === 'court';

					return (
						<FileCard
							key={doc.documentUuid}
							name={doc.name}
							onClick={() => {}}
							url={doc.url}
							classNameContainer={cn(isCourtCaseDoc ? 'bg-[#F2F2F2]' : 'bg-[#2CFF2C]/10')}
							classNameIcon={isCourtCaseDoc ? 'text-[#717171]/50' : 'text-[#27EC00]'}
						/>
					);
				})}

				{uploadFileCard}
			</div>
		</div>
	);
}
