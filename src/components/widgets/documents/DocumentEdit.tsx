import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';

import { DialogModal } from '@/components/dialog/DialogModal';

import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';

import { type DocumentsType } from '@/domains/documents/api/schema';

interface IDocumentEditProps {
	isOpen: boolean;
	documentType: DocumentsType;
	onClose: () => void;
	formBodyComp: ReactNode;
}

function getFormTitle(type: DocumentsType) {
	return type === 'contracts'
		? 'Редактирование договора'
		: type === 'invoices'
			? 'Редактирование cчёта'
			: 'Редактирование акта';
}

export function DocumentEdit({ isOpen, documentType, onClose, formBodyComp }: IDocumentEditProps) {
	return (
		<DialogModal onClose={onClose} isOpen={isOpen}>
			<SectionCard className='py-12 w-[50vw]'>
				<div className='flex justify-between items-center mb-7'>
					<Dialog.Title asChild>
						<h2 className='font-semibold text-h2'>{getFormTitle(documentType)}</h2>
					</Dialog.Title>

					<Dialog.Close className='cursor-pointer' asChild>
						<button className='p-1 hover:opacity-70 transition'>
							<Icon icon='X' size={24} />
						</button>
					</Dialog.Close>
				</div>

				{formBodyComp}
			</SectionCard>
		</DialogModal>
	);
}
