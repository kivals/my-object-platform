import * as Dialog from '@radix-ui/react-dialog';

import { DocumentForm } from '@/components/widgets/documents/upload/steps/DocumentForm';

import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';

import type { DocumentsType } from '@/domains/documents/api/schema';

interface IStepTwoFormProps {
	file: File;
	type: DocumentsType;
	isActive?: boolean;
}

function generateTitle(type: DocumentsType) {
	if (type === 'contracts') return 'Добавление договора';
	if (type === 'invoices') return 'Добавление счета';
	return 'Добавление акта';
}

export function StepTwoForm({ file, type, isActive }: IStepTwoFormProps) {
	return (
		<SectionCard classNames='py-12 w-[80vw]'>
			<div className='flex justify-between items-center'>
				<Dialog.Title asChild>
					<h2 className='mb-7 font-semibold text-h2'>{generateTitle(type)}</h2>
				</Dialog.Title>

				<Dialog.Close className='cursor-pointer' asChild>
					<button className='p-1 hover:opacity-70 transition'>
						<Icon icon='X' size={20} />
					</button>
				</Dialog.Close>
			</div>

			<DocumentForm isActive={isActive} file={file} />
		</SectionCard>
	);
}
