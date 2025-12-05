import { FileField } from '@/components/form/FileField';
import { TextField } from '@/components/form/TextField';

import { Button } from '@/ui/Button';
import { OptionGroup } from '@/ui/OptionGroup';

import { ALLOW_DOCUMENT_TYPES, DOCUMENT_STATUS_LABEL } from '@/domains/documents/constants';
import type { TDocumentStatus } from '@/domains/documents/types';

interface IDocumentFormProps {
	file: File;
	isActive?: boolean;
}

export function DocumentForm({ file, isActive = true }: IDocumentFormProps) {
	const status: TDocumentStatus = isActive ? 'active' : 'completed';

	return (
		<form className='flex flex-col gap-y-6' action=''>
			<FileField accept={ALLOW_DOCUMENT_TYPES} label='Файл' filename={file.name} />
			<TextField
				className='truncate'
				type='text'
				label='Название документа'
				placeholder='Введите название документа'
				accept={ALLOW_DOCUMENT_TYPES}
				value={file.name}
			/>
			<OptionGroup
				title='Статус договора'
				classNames='self-start'
				options={DOCUMENT_STATUS_LABEL}
				value={status}
			/>

			<div className='flex gap-x-3.5'>
				<Button className='flex-1 cursor-pointer'>Завершить добавление документа</Button>
				<Button variant='muted' className='flex-1 cursor-pointer'>
					Отменить добавление документа
				</Button>
			</div>
		</form>
	);
}
