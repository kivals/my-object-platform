import * as Dialog from '@radix-ui/react-dialog';

import { DialogModal } from '@/components/dialog/DialogModal';
import { DocumentEditForm } from '@/components/widgets/documents/upload/DocumentEditForm';

import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';

import { type DocumentsType } from '@/domains/documents/api/schema';
import type { TDocumentStatus } from '@/domains/documents/types';
import type { Uuid } from '@/types/common';

interface IDocumentEditProps {
	isOpen: boolean;
	documentType: DocumentsType;
	isCompleted: boolean;
	onClose: () => void;
	name: string;
	onDelete: () => void;
	isLoading?: boolean;
	documentUuid: Uuid;
}

function getFormTitle(type: DocumentsType) {
	return type === 'contracts'
		? 'Редактирование договора'
		: type === 'invoices'
			? 'Редактирование cчёта'
			: 'Редактирование акта';
}

export function DocumentEdit({
	isOpen,
	isCompleted,
	documentType,
	onClose,
	name,
	onDelete,
	documentUuid,
	isLoading = false
}: IDocumentEditProps) {
	const status: TDocumentStatus = !isCompleted ? 'active' : 'completed';

	return (
		<DialogModal onClose={onClose} isOpen={isOpen}>
			<SectionCard classNames='py-12 w-[50vw]'>
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

				<DocumentEditForm
					name={name}
					documentType={documentType}
					status={status}
					onClose={onClose}
					onDelete={onDelete}
					isLoading={isLoading}
					documentUuid={documentUuid}
				/>
			</SectionCard>
		</DialogModal>
	);
}
