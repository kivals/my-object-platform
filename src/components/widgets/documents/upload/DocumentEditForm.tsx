import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { TextField } from '@/components/form/TextField';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { OptionGroup } from '@/ui/OptionGroup';
import { Spinner } from '@/ui/Spinner';

import { cn } from '@/utils/cn';

import type { DocumentsType } from '@/domains/documents/api/schema';
import { DOCUMENT_STATUS_LABEL, DOCUMENT_TYPE_LABEL } from '@/domains/documents/constants';
import type { TDocumentStatus } from '@/domains/documents/types';
import { DocumentEditFormSchema } from '@/domains/documents/validate/edit.schema';

interface IDocumentEditFormProps {
	status: TDocumentStatus;
	documentType: DocumentsType;
	name: string;
	onClose: () => void;
	onDelete: () => void;
	isLoading?: boolean;
}

export function DocumentEditForm({
	status,
	name,
	documentType,
	onClose,
	onDelete,
	isLoading = false
}: IDocumentEditFormProps) {
	const { control } = useForm<z.infer<typeof DocumentEditFormSchema>>({
		defaultValues: {
			status: status,
			documentType: documentType
		}
	});

	return (
		<form className={cn('flex flex-col gap-y-8', isLoading && 'opacity-50 pointer-events-none')}>
			<div className='flex gap-x-3.5'>
				<TextField classNames='flex-1' type='text' disabled value={name} />
				<Button onClick={onDelete} variant='attention' className='cursor-pointer'>
					{isLoading ? <Spinner className='size-6' /> : <Icon icon='Trash2' size={25} />}
				</Button>
			</div>

			<Controller
				name='status'
				control={control}
				render={({ field }) => (
					<OptionGroup
						id={'status'}
						title='Статус документа'
						classNames='self-start'
						options={DOCUMENT_STATUS_LABEL}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>

			<Controller
				name='documentType'
				control={control}
				render={({ field }) => (
					<OptionGroup
						id={'documentType'}
						title='Тип документа'
						classNames='self-start'
						options={DOCUMENT_TYPE_LABEL}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>

			<div className='flex gap-x-3.5'>
				<Button className='flex-1 cursor-pointer'>Сохранить изменения</Button>
				<Button onClick={onClose} variant='muted' className='flex-1 cursor-pointer'>
					Отменить
				</Button>
			</div>
		</form>
	);
}
