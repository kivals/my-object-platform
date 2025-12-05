import { useParams, useRouter } from 'next/navigation';
import React, { startTransition, useActionState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { TextField } from '@/components/form/TextField';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { OptionGroup } from '@/ui/OptionGroup';
import { Spinner } from '@/ui/Spinner';

import { cn } from '@/utils/cn';

import { documentEditAction } from '@/actions/document-edit.action';
import type { DocumentsType } from '@/domains/documents/api/schema';
import { DOCUMENT_STATUS_LABEL, DOCUMENT_TYPE_LABEL } from '@/domains/documents/constants';
import type { TDocumentStatus } from '@/domains/documents/types';
import { DocumentEditFormSchema } from '@/domains/documents/validate/edit.schema';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

interface IDocumentEditFormProps {
	status: TDocumentStatus;
	documentType: DocumentsType;
	name: string;
	onClose: () => void;
	onDelete: () => void;
	isLoading?: boolean;
	documentUuid: Uuid;
}

//todo дублируется логика при работе с экшенами
const initialState = { error: undefined, success: false };

export function DocumentEditForm({
	status,
	name,
	documentType,
	onClose,
	onDelete,
	documentUuid,
	isLoading = false
}: IDocumentEditFormProps) {
	const [state, action, isPending] = useActionState(documentEditAction, initialState);
	const { uuid } = useParams<{ uuid: string }>();
	const router = useRouter();

	const { control, handleSubmit } = useForm<z.infer<typeof DocumentEditFormSchema>>({
		defaultValues: {
			status: status,
			documentType: documentType
		}
	});

	// возвращаемся на просмотр ПОСЛЕ успешного сохранения
	useEffect(() => {
		//todo есть задержка
		if (state.success) {
			onClose();
			toast.success('Данные успешно сохранены');
			router.push(`${REAL_ESTATE_URL}/${uuid}/documents`);
			router.refresh();
		}
	}, [state.success]);

	const onSubmit = async (submitData: z.infer<typeof DocumentEditFormSchema>) => {
		startTransition(() => {
			action({
				type: submitData.documentType,
				isCompleted: submitData.status === 'completed',
				uuid: uuid,
				documentUuid: documentUuid
			});
			state.error = '';
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn(
				'flex flex-col gap-y-8',
				isLoading || (isPending && 'opacity-50 pointer-events-none')
			)}
		>
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
