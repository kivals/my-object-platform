'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { DocumentEdit } from '@/components/widgets/documents/DocumentEdit';

import { Badge } from '@/ui/Badge';
import { Icon } from '@/ui/Icon';

import { cn } from '@/utils/cn';

import type { DocumentsType } from '@/domains/documents/api/schema';
import { deleteFile } from '@/domains/real-estate/api/api.client';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

interface IDocumentItemProps {
	documentUuid: Uuid;
	isCompleted: boolean;
	name: string;
	url: string;
	documentType: DocumentsType;
}

export function DocumentItem({
	name,
	isCompleted,
	url,
	documentType,
	documentUuid
}: IDocumentItemProps) {
	const label = isCompleted ? 'Завершенный' : 'Действующий';
	const [isEdit, setIsEdit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { uuid } = useParams<{ uuid: string }>();
	const router = useRouter();

	//todo useOptimistic чтобы не ждать ответ от сервера
	async function handleDelete() {
		if (!uuid || !documentUuid) return;

		try {
			setIsLoading(true);
			await deleteFile(uuid, documentUuid, 'documents');

			//TODO hack, нужно выяснить почему не сработал router.refresh();
			router.push(`${REAL_ESTATE_URL}/${uuid}/documents`);
		} catch (err) {
			console.error('[handleDelete] Failed:', err);
			toast.error('Ошибка удаления документа');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<div
				onClick={() => {
					setIsEdit(true);
				}}
				className={cn(
					'flex flex-col justify-between relative w-[200px] h-[256px] px-2 py-3 rounded-[15px] ',
					isCompleted ? 'bg-[#F2F2F2]' : 'bg-[#2CFF2C]/10'
				)}
			>
				<div className='flex items-center justify-between'>
					<Badge
						classNames='self-start rounded-[8px] px-3 py-1.5 text-[12px]'
						variant={isCompleted ? 'muted' : 'success'}
					>
						{label}
					</Badge>
					<Link href={url}>
						<Icon classNames='text-[#868686]' icon='Download' size={25} />
					</Link>
				</div>

				<Icon
					classNames={cn(
						'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
						isCompleted ? 'text-[#717171]/50' : 'text-[#27EC00]'
					)}
					icon='FileTextIcon'
					size={85}
					strokeWidth={1}
				/>
				<span className='truncate text-wrap text-body font-medium'>{name}</span>
			</div>
			{isEdit && (
				<DocumentEdit
					name={name}
					onClose={() => {
						setIsEdit(false);
					}}
					isOpen={isEdit}
					isCompleted={isCompleted}
					documentType={documentType}
					onDelete={handleDelete}
					isLoading={isLoading}
				/>
			)}
		</>
	);
}
